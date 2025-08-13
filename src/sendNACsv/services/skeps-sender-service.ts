import { AxiosInstance } from "axios";
import { defineBotConfig } from "../../defineBotConfig";
import { env } from "../../env";

export class SkepsSenderService {
    constructor(private axiosClient: AxiosInstance) { }

    async individual(environment, phone, templateName, parameters) {
        try {
            const botConfig = defineBotConfig(environment)
            const url = env.URL_DISPARO
            const payload = {
                "routerBotKey": botConfig.routerBotKey,
                "botKey": botConfig.botKey,
                "botSlug": botConfig.botSlug,
                "phone": phone,
                "namespace": botConfig.namespace,
                "templateName": templateName,
                "parameters": parameters !== '' ? [{
                    "type": "text",
                    "text": parameters,
                    "componentType": "body"
                }] : [],
                "stateId": botConfig.stateId,
                "flowId": botConfig.flowId,
                "contactExtras": {}
            };
            await this.axiosClient.post(url, payload)
        } catch (err) {
            throw new Error('erro no envio da NA')
        }
    }
}
