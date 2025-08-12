import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responder } from "../commom/Responder";
import axios from "axios";
import { ResetContactUseCase } from "./resetContactUseCase";
import HttpStatusCode from "../commom/HttpStatusCode";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const responder = new Responder()
    
    const csv = event.body
    const resetContactUseCase = new ResetContactUseCase(axios)
    const responseResetContact =  await resetContactUseCase.execute(csv)

    if(responseResetContact.code === HttpStatusCode.NO_CONTENT) {
        return responder.send(HttpStatusCode.OK, responseResetContact)
    }
    return responder.send(HttpStatusCode.INTERNAL_SERVER_ERROR, csv)
}