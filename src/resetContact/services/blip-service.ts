import { AxiosInstance, AxiosRequestConfig } from "axios";
import { randomUUID } from "node:crypto";

export class BlipService {
    constructor(private axiosClient: AxiosInstance) { }

    async getUserContextVariables(phone: string, apiKey: string) {
        const baseUrl = 'https://http.msging.net/commands'
        const payload = {
            "id": `${randomUUID()}`,
            "method": "get",
            "uri": `/contexts/${phone}%40wa.gw.msging.net?withContextValues=true&$take=1000`
        }

        const configAxios: AxiosRequestConfig = {
            headers: {
                Authorization: apiKey
            }
        }

        const { data } = await this.axiosClient.post(baseUrl, payload, configAxios)
        const variableList = data.resource.items
        const variables = variableList.map((variable) => variable.name)

        return variables
    }

    async deleteContextVariable(variable, phone, apiKey) {
        const baseUrl = 'https://http.msging.net/commands'
        const payload = {
            "id": `${randomUUID()}`,
            "method": "delete",
            "uri": `/contexts/${phone}%40wa.gw.msging.net/${variable}`
        }

        const configAxios: AxiosRequestConfig = {
            headers: {
                Authorization: apiKey
            }
        }

        const { data } = await this.axiosClient.post(baseUrl, payload, configAxios)
        return data
    }

}