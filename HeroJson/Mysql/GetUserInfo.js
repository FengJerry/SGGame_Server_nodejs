var database = require('./ConnectMysql.js');

exports.Response = function (req , res) {
    
	var connection = database.getConnection();
    
    var sqlUser = 'select UserId,Gold,Diamond,Stamina from tb_userinfo where userId = ' + connection.escape(req.body.userId);
    var sqlHero = 'select UserHeroId HeroId,HeroLevel from tb_userhero where userId = ' + connection.escape(req.body.userId);
    var sqlEquipment = 'select * from tb_userequipment where userId = ' + connection.escape(req.body.userId);

    var pool = database.getConnectionPool();
    
    pool.getConnection(function (err, connection) {
	     var  respondResult = "" ;
        // Use the connection
        connection.query(sqlUser, function (err, rows) {
            // And done with the connection.

            var result = JSON.stringify(rows[0]);
			//  connection.release();
	        respondResult += "\"data\": " + result+",";
			
			
			connection.query(sqlHero, function (err, rows) {
            
				var result = JSON.stringify(rows);
				// connection.release();
				respondResult += "\"heroConfig\": " + result+ ",";
			 
			   connection.query(sqlEquipment, function (err, rows) {
					var result = JSON.stringify(rows);
					// connection.release();
					respondResult += "\"equipmentConfig\": " + result ;
					connection.release();
					res.type('json');
					respondResult = "{" + respondResult +"}";
					return res.send(respondResult);
                });
			});
         });
     });

}