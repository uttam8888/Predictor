const util = require("util");
const mysql = require('mysql');
// const connection = require("/opt/nodejs/db/mysql-connection");
// const logger = require('debug')('app_logger');

exports.handler = async (event, context) => {
    console.log("Event : " + JSON.stringify(event));
    let finalResponse = {};
    finalResponse.data = {};
    var col;
    var name;
    var sign;
    var key;
    var pairId;
    var retry;
    
    var response = {};
    
    // var connection = mysql.createConnection({
    //   host     : "appsync-test-mumbai.czkx8n40zzdy.ap-south-1.rds.amazonaws.com",
    //   user     : "admin",
    //   password : "uttamkumar",
    //   port     : "3306",
    //   database  : "tic_tac_toe"
    // });

     
    try {
        event.body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
        col = JSON.stringify(event.arguments.cellData.col);
        name =  JSON.stringify(event.arguments.cellData.name);
        sign = JSON.stringify(event.arguments.cellData.sign);
        key = JSON.stringify(event.arguments.cellData.key);
        pairId = JSON.stringify(event.arguments.cellData.pairId);
        retry = JSON.stringify(event.arguments.cellData.retry);
        
        // const query = util.promisify(connection.query).bind(connection);
        // let str = "INSERT INTO col_info (cell_id, first_name, sign, unique_key) VALUES(" + col + "," + name + "," + sign + "," + key +")";
        // let result =  await query(str);
        
        response = {
            col : event.arguments.cellData.col,
            name : event.arguments.cellData.name,
            sign : event.arguments.cellData.sign,
            key : event.arguments.cellData.key,
            pairId : event.arguments.cellData.pairId,
            retry : event.arguments.cellData.retry
        }
        
        console.log(JSON.stringify(response));
        
        // response.cellInfo = res;
    } catch (error) {
        response.statusCode = 500,
            response.body = JSON.stringify(error.message);
    }

    return response;
};
