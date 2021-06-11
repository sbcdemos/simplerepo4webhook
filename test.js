exports.handler = async (event, context) => {
    console.log(event);

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