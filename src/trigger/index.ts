/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Responder } from "../commom/Responder";

import { helloWorld } from "./services/helloWorldUseCase"; 
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const responder = new Responder();

  try {
    const useCase = new helloWorld(axios, uuidv4);

    try {
      const response = await useCase.init();
      return responder.send(200, response);
    } catch (useCaseError) {
      console.error(useCaseError);

      return responder.send(500, { errorMessage: "Erro ao executar." });
    }

  } catch (error) {
    console.error(error);
    return responder.send(500)
  }
}