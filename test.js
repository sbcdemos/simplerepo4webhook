exports.handler = async (event, context) => {
    console.log(event);
    /*Where to get information for controller?
        HTTPMethod: event.httpMethod
        extra path: event.pathParameters. For example, if your api is located at /api/function/ path and
                    you are calling /api/function/details/123, then event.pathParameters 
                    will contain "details/123"
        
        body:       event.body, but it is base64 encoded. So to get body as object, use: 
                    const eventBody = JSON.parse(Buffer.from(event.body, 'base64').toString('ascii'))

        query:      path.queryStringParameters. Example: /api/function?search=something, this object will look like:
                    {
                        search: "something"
                    }
                    

    */
    const output =
    {
        'statusCode': 200,
        'headers':
        {
            'Content-Type': 'application/json'
        },
        'isBase64Encoded': false,
        'body': JSON.stringify(event)
    }
    return output;
}