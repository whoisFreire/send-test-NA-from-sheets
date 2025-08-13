import { AxiosInstance } from "axios";
import { BlipService } from "./services/blip-service";
import HttpStatusCode from "../commom/HttpStatusCode";
import { transformCsv } from "./services/trasform-csv";
import { env } from "../env";

export class ResetContactUseCase {
    constructor(private axiosClient: AxiosInstance) { }
    async execute(csv) {
        try {
            const contacts = transformCsv(csv)
            if (!contacts || contacts.length === 0) {
                return {
                    message: "No contacts found",
                    code: HttpStatusCode.BAD_REQUEST
                }
            }
            const blipService = new BlipService(this.axiosClient)

            contacts.forEach(async (contact) => {
                const phone = contact.telefone.substr(0, 2) != '55' ? '55' + contact.telefone : contact.telefone
                const environment = contact.ambiente
                const apiKey = environment === 'dev' ? env.ROUTER_KEY_TEST : env.ROUTER_KEY
                
                const variables = await blipService.getUserContextVariables(phone, apiKey)
                if (variables.code) {
                    return
                }
                variables.forEach(async (variable) => {
                    try {
                        await blipService.deleteContextVariable(variable, phone, apiKey)
                    } catch (err) {
                        console.error('Error on delete context')
                        throw new Error('Error on delete context')
                    }
                });
            })

            return {
                message: "success",
                code: HttpStatusCode.NO_CONTENT
            }
            
        } catch (err) {
            console.error('Error on get context')
            return {
                message: "Internal server Error",
                code: HttpStatusCode.INTERNAL_SERVER_ERROR
            }
        }
    }
}