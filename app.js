let mysql = require('mysql');

exports.handler = async (event, context) => {
    console.log(event);
    const output =
    {
        'statusCode': 200,
        'headers':
        {
            'Content-Type': 'application/json'
        },
        'isBase64Encoded': false,
        'body': 'NEW FUNCTION CREATED VIA API (1)'
    }
    return output;
}
