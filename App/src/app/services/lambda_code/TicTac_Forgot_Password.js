const util = require("util");
const mysql = require('mysql');
// const connection = require("/opt/nodejs/db/mysql-connection");
// const logger = require('debug')('app_logger');

exports.handler = async (event, context) => {
    console.log("Event : " + JSON.stringify(event));
    let finalResponse = {};
    var email;
    var password;
    var newPassword;
    
    var response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE"
        },
    };
    
    var connection = mysql.createConnection({
      host     : "appsync-test-mumbai.czkx8n40zzdy.ap-south-1.rds.amazonaws.com",
      user     : "admin",
      password : "uttamkumar",
      port     : "3306",
      database  : "tic_tac_toe"
    });

    try {
        event.body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
        email = JSON.stringify(event.body.email);
        password = JSON.stringify(event.body.password);
        newPassword = JSON.stringify(event.body.newPassword);
        const query = util.promisify(connection.query).bind(connection);
        let count = "SELECT COUNT(*) FROM USERS WHERE email = " + email;
        let res =  await query(count);
        if(JSON.stringify(res[0]['COUNT(*)']) > 0){
            let str = "UPDATE USERS SET PASSWORD = " + password + " WHERE email= " + email;
            let result =  await query(str);
            finalResponse.msg = "Password updated successfully" ;
            finalResponse.statusCode = 200;
            response.body = JSON.stringify(finalResponse);
        }else{
            finalResponse.msg = "Incorrect Username" ;
            finalResponse.statusCode = 401;
            response.body = JSON.stringify(finalResponse);
        }
    } catch (error) {
        response.statusCode = 500,
            response.body = JSON.stringify(error.message);
    }
    return response;
};
