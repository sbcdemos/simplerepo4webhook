let mysql = require('mysql');

exports.handler = async (event, context) => {
    console.log(event);

    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host     : '192.168.0.30',
      user     : 'root',
      password : 'secret',
      database : 'mydb'
    });
    
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
