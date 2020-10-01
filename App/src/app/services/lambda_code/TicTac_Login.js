const util = require("util");
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const crypto = require('crypto-js');

exports.handler = async (event, context) => {
    console.log("Event : " + JSON.stringify(event));
    let finalResponse = {};
    var email;
    var password;
    
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
        
        const query = util.promisify(connection.query).bind(connection);
        let str = "SELECT COUNT(*) FROM USERS WHERE email = " + email;
        let result =  await query(str);
        console.log("result ===" + JSON.stringify(result[0]['COUNT(*)']));
        if(JSON.stringify(result[0]['COUNT(*)']) > 0){
            // var ff = util.promisify(crypto.AES.decrypt);
            var decryptPwd  = await crypto.AES.decrypt(event.body.password, '1@2&3#4^5$6%8$#@&^UTTAM').toString(crypto.enc.Utf8);
            console.log("originalText " +  decryptPwd );
            
            // const info3 = JSON.parse(bytes);
            
            // const info3 = JSON.stringify( { bytes });
            // console.log("info3 ; " + info3);
            // console.log({ str: info3.str });
            
            let pwd = "SELECT password FROM USERS WHERE email = " + email;
            let pwdRes =  await query(pwd);
            const hash = pwdRes[0]['password'];
            // const comparePassword = util.promisify(bcrypt.compare);
            const check =  await bcrypt.compare(decryptPwd, hash);
            console.log("testing-check : " + check);
            
            if(check){
                let key = "SELECT first_name, last_name, email, unique_key, gender, login_date FROM USERS WHERE email = " + email;
                let playerKey =  await query(key);
                console.log("user data : " + JSON.stringify(playerKey));
                
                var regis_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
                let update = "UPDATE USERS SET login_date = '" + regis_time + "' WHERE email = " + email;
                await query(update);
                
                finalResponse.msg = "Successfully Logged in ." ;
                finalResponse.statusCode = 200;
                finalResponse.userData = playerKey;
                response.body = JSON.stringify(finalResponse);
            } else {
                finalResponse.msg = "Incorrect Password ." ;
                finalResponse.statusCode = 401;
                response.body = JSON.stringify(finalResponse);
            }
        }else{
            finalResponse.statusCode = 401;
            finalResponse.msg = "Incorrect username ." ;
            response.body = JSON.stringify(finalResponse);
        }
    } catch (error) {
        console.log(JSON.stringify(error));
        response.statusCode = 500,
        response.body = JSON.stringify(error.message);
    }
    return response;
};
