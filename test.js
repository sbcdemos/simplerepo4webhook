exports.handler = async (event, context) => {
    var eventBody = JSON.parse(event);
    console.log(eventBody);

    const output =
    {
        'statusCode': 200,
        'headers':
        {
            'Content-Type': 'text/plain'
        },
        'isBase64Encoded': false,
        'body': 'JUST AN EMPTY OUTPUT (text-plain)'
    }
    return output;
}