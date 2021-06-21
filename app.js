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
    
    
/*    connection.query('SELECT count(*) as solution from clients', function (error, results, fields) {
        if (error) throw error;
        console.log('Number of clients is: ', results[0].solution);
      });
  */
    let results = await executeQuery(connection, 'SELECT count(*) as solution from clients');
    console.log('Number of clients is: ', results[0].solution);

    connection.end();

    const output =
    {
        'statusCode': 200,
        'headers':
        {
            'Content-Type': 'application/json'
        },
        'isBase64Encoded': false,
        'body': '2) The number of clients is: '+results[0].solution
    }
    return output;
}

function executeQuery(connection, query){
    return new Promise(function(resolve, reject) {
        try {
            connection.query(query, function (error, results, fields) {
                if (error) throw error;
                resolve(results);
              });
        }
        catch (e){
            reject(e);
        }
    })
}