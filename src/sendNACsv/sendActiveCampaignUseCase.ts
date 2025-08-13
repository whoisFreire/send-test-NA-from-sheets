import { AxiosInstance } from "axios";
import { transformCsv } from "./services/trasform-csv";
import { SkepsSenderService } from "./services/skeps-sender-service";
import HttpStatusCode from "../commom/HttpStatusCode";

export class SendActiveCampaignUseCase {
    constructor(private axiosClient: AxiosInstance) { }

    async execute(csv) {
        const contacts = transformCsv(csv)
        const skepsSenderService = new SkepsSenderService(this.axiosClient)

        try {
            contacts.forEach(async (contact) => {
                const phone = contact.telefone.substr(0,2) != '55' ? '55' + contact.telefone : contact.telefone
                const templateName = contact.templateName
                const environment = contact.ambiente
                const parameters = contact["imagem_url"] ? contact["imagem_url"] : ''
                await skepsSenderService.individual(environment, phone, templateName, parameters)
            })
            return {
                message: "success",
                code: HttpStatusCode.OK
            }
        }catch(err) {
            return {
                message: "erro ao enviar NA",
                code: HttpStatusCode.INTERNAL_SERVER_ERROR
            }
        }

    }
}