exports.handler = async (event, context) => {
    console.log(event);
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