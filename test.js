exports.handler = async (event, context) => {
    console.log(eventBody);
    //HTTPMethod: eventBody.httpMethod?


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