export const normalizerEvent = event => {
    return {
        method: event['httpMethod'],
        data: event['body'] ? JSON.parse(event['body']) : {},
        queryString: event['queryStringParameters'] || {},
        pathParameters: event['pathParameters'] || {}
    }
}