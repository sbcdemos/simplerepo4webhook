let mysql = require('mysql');

exports.handler = async (event, context) => {
    console.log(event);

    var mysql = require('mysql')
    var connection = mysql.createConnection({
      host     : '192.168.0.30',
      user     : 'root',
      password : context.getUserData("dbpwd"),
      database : 'test'
    });
    connection.connect();
    
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
      });
      
    connection.end();
    
    const output =
    {
        'statusCode': 200,
        'headers':
        {
            'Content-Type': 'application/json'
        },
        'isBase64Encoded': false,
        'body': 'NEW FUNCTION CREATED VIA API (2)'
    }
    return output;
}
