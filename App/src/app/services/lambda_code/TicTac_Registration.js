const util = require("util");
const mysql = require('mysql');
// const connection = require("/opt/nodejs/db/mysql-connection");
// const logger = require('debug')('app_logger');

exports.handler = async (event, context) => {
    console.log("Event : " + JSON.stringify(event));
    let finalResponse = {};
    var first_name;
    var last_name;
    var email;
    var password;
    var gender;
    
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

     function randomNumber(length) {
         var text = "";
         var possible = "123456789";
         for (var i = 0; i < length; i++) {
          var sup = Math.floor(Math.random() * possible.length);
          text += i > 0 && sup == i ? "0" : possible.charAt(sup);
         }
         return JSON.stringify(event.body.firstName + text) ;
     }
    try {
        event.body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
        first_name = JSON.stringify(event.body.firstName);
        last_name =  JSON.stringify(event.body.lastName);
        email = JSON.stringify(event.body.email);
        password = JSON.stringify(event.body.password);
        gender = JSON.stringify(event.body.gender);
        const query = util.promisify(connection.query).bind(connection);
        let str = "SELECT COUNT(*) FROM USERS WHERE email = " + email;
        let result =  await query(str);
        console.log("result ===" + JSON.stringify(result[0]['COUNT(*)']));
        if(JSON.stringify(result[0]['COUNT(*)']) == 0){
            
            var regis_time = new Date().toISOString().slice(0, 19).replace('T', ' '); 
            // var regis_time;
            // var d = new Date();
            // regis_time = [d.getFullYear() ,d.getMonth()+1,
            //       d.getDate()
            //       ].join('-')+' '+
            //       [d.getHours(),
            //       d.getMinutes(),
            //       d.getSeconds()].join(':');
                   
            //       console.log("registime : " + regis_time);
                   console.log("date " + new Date());
            
            let str = "INSERT INTO USERS (first_name, last_name, email, password, gender, registration_date) VALUES(" + first_name + "," + last_name + "," + email + "," + password + "," + gender + ", '" + regis_time +"')";
            let result =  await query(str);
            console.log("insertId " + JSON.stringify(result.insertId));
            let key = randomNumber(4);
            console.log("Unique Key : " + key);
            let update = "UPDATE USERS SET unique_key = " + key + " WHERE userId = " + result.insertId;
            let updateResult =  await query(update);
            
            finalResponse.msg = "User registered Succesfully ." ;
            finalResponse.statusCode = 200;
            response.body = JSON.stringify(finalResponse);
        } else {
            finalResponse.msg = "Email alredy exists. please reset your password using forgot password link ." ;
            finalResponse.statusCode = 401;
            response.body = JSON.stringify(finalResponse);
        }
    } catch (error) {
        response.statusCode = 500,
        response.body = JSON.stringify(error.message);
    }

    return response;
};
