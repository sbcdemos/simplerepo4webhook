//import secion. Put your dependencies here
let mysql = require('mysql');

//Main function, that receive events. The controller code functions are defined later
exports.handler = async (event, context) => {
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
    const eventBody = event.body ? JSON.parse(Buffer.from(event.body, 'base64').toString('ascii')): {}

    var controllerOutput={
        body: {},
        contentType: "application/json"
    }
    /* Database connection preparation */
    var connection = mysql.createConnection({
      host     : context.getUserData("dbhost"),
      user     : context.getUserData("dbuser"),
      password : context.getUserData("dbpwd"),
      database : context.getUserData("databasename")
    });
    connection.connect();
    /*
    Typical CRUD controller: action depends on HTTP method
    */
    console.log("HTTP method: "+event.httpMethod);
    switch (event.httpMethod) {
        case "GET":
            controllerOutput = await getProducts(connection, event.queryStringParameters.name);
            break;

        case "POST":
            controllerOutput = await createProduct(connection, eventBody);
            break;

        case "PUT":
            controllerOutput = await updateProduct(connection, eventBody);
            break;

        case "DELETE":
            console.log(event.pathParameters);
            controllerOutput = await deleteProduct(connection, event.pathParameters)
            break;
        default:
            controllerOutput = {
                body: "Unrecognized command",
                contentType: "text/plain"
            }
    }
    const output =
    {
        'statusCode': controllerOutput.statusCode? controllerOutput.statusCode : 200,
        'headers':
        {
            'Content-Type': controllerOutput.contentType
        },
        'isBase64Encoded': false,
        'body': (typeof controllerOutput.body)==='string' ? controllerOutput.body : JSON.stringify(controllerOutput.body)
    }
    console.log(output)
    return output;
}

async function getProducts(connection, searchForName)
{
    var SQL = "select * from products ";
    if (searchForName)
    {
        SQL = SQL +" where name like ?";
        searchForName=searchForName+'%';
    }
    SQL = SQL + ' limit 100';
    const products = await executeQuery(connection, SQL, [searchForName]);
    console.log(products);
    return {
        body: products,
        contentType: 'application/json'
    }
}

async function createProduct(connection, product)
{
    const SQL = "insert into Products (Name, Description, Price) values (?, ?, ?);";
    const result = await executeQuery(connection, SQL, [product.name, product.description, product.price]);
    return {
        body: 'OK',
        statusCode: 201,
        contentType: 'text/plain'
    }
}

async function updateProduct(connection, product)
{
    const SQL = "update Products set Name = ?, description = ?, price = ? where ID=?";
    const result = await executeQuery(connection, SQL, [product.name, product.description, product.price, product.id]);
    return {
        body: 'OK',
        contentType: 'text/plain'
    }
}

async function deleteProduct(connection, productId)
{
    const SQL = "delete from Products where ID=?";
    const result = await executeQuery(connection, SQL, [productId]);
    return {
        body: 'OK',
        contentType: 'text/plain'
    }
}

//Special function to "promisify" query execution
function executeQuery(connection, querySQL, queryParams){
    console.log("Query params: "+queryParams);
    console.log("SQL: "+querySQL);
    return new Promise(function(resolve, reject) {
        try {
            connection.query(querySQL, queryParams, function (error, results, fields) {
                if (error) throw error;
                resolve(results);
            });
        }
        catch (e){
            reject(e);
        }
    })
}