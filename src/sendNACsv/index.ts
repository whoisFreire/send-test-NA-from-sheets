import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responder } from "../commom/Responder";
import axios from "axios";
import { ResetContactUseCase } from "./resetContactUseCase";
import { SendActiveCampaignUseCase } from "./sendActiveCampaignUseCase";
import HttpStatusCode from "../commom/HttpStatusCode";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const responder = new Responder()
    try {
        const csv = event.body
        const resetContactUseCase = new ResetContactUseCase(axios)
        await resetContactUseCase.execute(csv)
        const sendActiveCampaignUseCase = new SendActiveCampaignUseCase(axios)
        const responseSendActiveCampaign = await sendActiveCampaignUseCase.execute(csv)

        return responder.send(responseSendActiveCampaign.code, responseSendActiveCampaign)
    } catch (err) {
        console.log(err)
        return responder.send(HttpStatusCode.INTERNAL_SERVER_ERROR, {
            message: err,
            code: HttpStatusCode.INTERNAL_SERVER_ERROR
        })
    }
}