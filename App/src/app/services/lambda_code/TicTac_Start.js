const util = require("util");
const mysql = require('mysql');
exports.handler = async (event, context) => {
    console.log("Event : " + JSON.stringify(event));
    let finalResponse = {};
    finalResponse.data = {};
    var player1_key;
    var player1_sign;
    var player2_key;
    var player1Name = '';
    var player1Sign = '';
    var player2Name = '';
    var player2Sign = '';
    var player1Key = '';
    var player2Key = '';
    var resdata = {
        player1 : {
            name : "",
            sign : "",
            key : ""
        }, 
        player2 : {
            name : "",
            sign : "",
            key : ""
        },
        pairID : ""
    };
    
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
        player1_key = JSON.stringify(event.body.player1_key);
        player1_sign = JSON.stringify(event.body.player1_sign);
        player2_key = JSON.stringify(event.body.player2_key);
        const query = util.promisify(connection.query).bind(connection);
        
        // ======================================Deletion before Insertion Starts=======================================================================
       
        // let getP1IDQuery = "SELECT pair_id FROM USERS WHERE unique_key = " Chandan5662";";
        let getP1IDQuery = "SELECT pair_id FROM USERS WHERE unique_key IN ( " + player1_key + "," + player2_key + ")";
        let getP1IDRes =  await query(getP1IDQuery);
        console.log("getP1IDRes" +JSON.stringify(getP1IDRes));
        if(getP1IDRes[0]["pair_id"] != getP1IDRes[1]["pair_id"]){
            for (var i = 0; i < getP1IDRes.length; i++) {
              console.log("00000000000 " + JSON.stringify(getP1IDRes[i]["pair_id"]));
              if(getP1IDRes[i]["pair_id"] != null){
                  let del = "DELETE FROM USERS_PAIR WHERE user_pair_id = " + getP1IDRes[i]["pair_id"];
                  await query(del);
              }
            }
            let update = "UPDATE USERS SET pair_id = NULL WHERE unique_key IN (" + player1_key + "," + player2_key + ")";
            await query(update);
            let delsign = "DELETE FROM USERS_SIGN WHERE players_key IN ( " + player1_key + "," +  player2_key + ")";
            await query(delsign);
        }
         
         
        // ======================================Deletion before Insertion Ends==========================================================================
        
        let str = "SELECT COUNT(*) FROM USERS_PAIR WHERE player1_key IN (" + player1_key + "," + player2_key + ")";
        let result =  await query(str);
        if(JSON.stringify(result[0]['COUNT(*)']) == 0){
            let insPair = "INSERT INTO USERS_PAIR (player1_key, player2_key) VALUES(" + player1_key +"," + player2_key + ")";
            let res =  await query(insPair);
            let update = "UPDATE USERS SET pair_id = " + res.insertId + " WHERE unique_key IN( " + player1_key + "," + player2_key + ")";
            await query(update);
            console.log("player1_sign" + player1_sign);
            
            console.log();
            if(event.body.player1_sign === "cross"){
                let insSign = "INSERT INTO USERS_SIGN (players_key, players_sign) VALUES(" + player1_key +"," + player1_sign + ")";
                await query(insSign);
                
                let insSign2 = "INSERT INTO USERS_SIGN (players_key, players_sign) VALUES(" + player2_key +", 'circle')";
                await query(insSign2);
            }else{
                let insSign = "INSERT INTO USERS_SIGN (players_key, players_sign) VALUES(" + player1_key +"," + player1_sign + ")";
                await query(insSign);
                
                let insSign2 = "INSERT INTO USERS_SIGN (players_key, players_sign) VALUES(" + player2_key +", 'cross')";
                await query(insSign2);
            }
            
        }
        
        // else{
        //     let count = "SELECT COUNT(*) FROM USERS_SIGN WHERE players_key = " + player1_key;
        //     let playCount =  await query(count);
        //     if(JSON.stringify(playCount[0]['COUNT(*)']) == 0){
        //         let getSign = "SELECT players_sign FROM USERS_SIGN WHERE players_key = " + player2_key;
        //         let sign =  await query(getSign);
        //         var sig = sign[0]['players_sign'].toString().replace(/\r?\n$/, '');
        //         if(sign != ""){
        //             if(sig === 'cross'){
        //                 let insSign = "INSERT INTO USERS_SIGN (players_key, players_sign) VALUES(" + player1_key + ", 'circle')";
        //                 let resSign =  await query(insSign);
        //             }else{
        //                 let insSign = "INSERT INTO USERS_SIGN (players_key, players_sign) VALUES(" + player1_key + ", 'cross')";
        //                 let resSign =  await query(insSign);
        //             }
        //         }
        //     }
        // }
        
        // =======================================Fetching Data for Display IN UI==================================================================
        
        let pairIdQuery = "SELECT pair_id FROM USERS WHERE unique_key = " + player1_key;
        let pairID = await query(pairIdQuery);
        let pair_id = pairID[0]['pair_id'];
        
        let p1Name = "SELECT first_name FROM USERS WHERE unique_key = ( SELECT player1_key FROM USERS_PAIR WHERE user_pair_id = " + pair_id +")";
        let p1NameRes = await query(p1Name);
        player1Name = p1NameRes[0]['first_name'];
        
        let p1Sign = "SELECT players_sign FROM USERS_SIGN WHERE players_key = ( SELECT player1_key FROM USERS_PAIR WHERE user_pair_id = " + pair_id +")";
        let p1SignRes = await query(p1Sign);
        console.log("pp===========" + p1SignRes[0]['players_sign']);
        player1Sign = p1SignRes[0]['players_sign'];
        
        let p1key = "SELECT player1_key FROM USERS_PAIR WHERE user_pair_id = " + pair_id;
        let p1keyres = await query(p1key);
        player1Key = p1keyres[0]['player1_key'];
        
        let p2Name = "SELECT first_name FROM USERS WHERE unique_key = ( SELECT player2_key FROM USERS_PAIR WHERE user_pair_id = " + pair_id +")";
        let p2NameRes = await query(p2Name);
        player2Name = p2NameRes[0]['first_name'];
        
        let p2Sign = "SELECT players_sign FROM USERS_SIGN WHERE players_key = ( SELECT player2_key FROM USERS_PAIR WHERE user_pair_id = " + pair_id +")";
        let p2SignRes = await query(p2Sign);
        console.log("pp=====4======" + JSON.stringify(p2SignRes));
        player2Sign = p2SignRes[0]['players_sign'];
        
        let p2key = "SELECT player2_key FROM USERS_PAIR WHERE user_pair_id = " + pair_id;
        let p2keyres = await query(p2key);
        player2Key = p2keyres[0]['player2_key'];
        console.log("testt6666ttttt " + JSON.stringify(p2keyres));
        
        resdata.player1.name = player1Name;
        resdata.player1.sign = player1Sign;
        resdata.player1.key = player1Key;
        resdata.player2.name = player2Name;
        resdata.player2.sign = player2Sign;
        resdata.player2.key = player2Key;
        resdata.pairID = pair_id;
        // resdata.msg = "Manipulated and retrieved data successfully";
        console.log("testtttttt " + JSON.stringify(resdata));
        response.body = JSON.stringify(resdata);
        // response.statusMessage  = "Manipulated and retrieved data successfully";
    } catch (error) {
        response.statusCode = 500,
            response.body = JSON.stringify(error.message);
    }
console.log(JSON.stringify(response));
    return response;
};
