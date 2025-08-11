import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responder } from "../commom/Responder";
import axios from "axios";
import { ResetContactUseCase } from "./services/resetContactUseCase";
import { normalizerEvent } from "../commom/normalizer";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const request = normalizerEvent(event)
    const { data } = request
    const { phone, apiKey } = data
    const responder = new Responder()
    const resetContactUseCase = new ResetContactUseCase(axios)
    const response =  await resetContactUseCase.execute(phone, apiKey)
    return responder.send(response.code, response)
}