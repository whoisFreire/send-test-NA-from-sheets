import { AxiosInstance } from "axios";
import { BlipService } from "./blip-service";

export class ResetContactUseCase {
    constructor(private axiosClient: AxiosInstance) { }
    async execute(phone, apiKey) {
        const blipService = new BlipService(this.axiosClient)
        try {
            const variables = await blipService.getUserContextVariables(phone, apiKey)

            variables.forEach(async (variable) => {
                try {
                    await blipService.deleteContextVariable(variable, phone, apiKey)
                } catch (err) {
                    throw new Error('erro ao deletar variavel')
                }

            });
            return {
                message: "success",
                code: 200
            }

        }catch(err) {
            throw new Error('erro no resetContactUseCase')
        }

    }
}