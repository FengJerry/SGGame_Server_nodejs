var database = require('D:/Node.js/HeroJson/HeroJson/Mysql/ConnectMysql.js');

exports.Response = function (req , res) {
	
	//var data1 = req.body.mq;
 //   var data2 = req.body.lww;
  //  console.log(data2);

  //  return res.send("hello world");
	
	
	  var connection = database.getConnection();
	
	var sqlUser = 'select UserId,Gold,Diamond,Stamina from tb_userinfo where userId = ' + connection.escape(req.body.userId);
		var sqlHero = 'select HeroId,HeroLevel from tb_userhero where userId = ' + connection.escape(req.body.userId);
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
			
			
	// Don't use the connection here, it has been returned to the pool.
		});
		
		
		
		
		
		
		
		 // connection.query(sqlHero, function (err, rows) {
			
			 // var result = JSON.stringify(rows);
			// // connection.release();
			 // respondResult += "\"heroConfig\": " + result+ ",";
			// count++;
			// if(count == 3){
			   // connection.release();
				// respondResult = "{" + respondResult +"}";
			   // res.type('json');
			   // return res.send(respondResult);
			// }
		 // });
		
		 // connection.query(sqlEquipment, function (err, rows) {
			
			 // var result = JSON.stringify(rows);
			// // connection.release();
			 // respondResult += "\"equipmentConfig\": " + result ;
			// count++;
			// if(count == 3){
			   // connection.release();
			   // res.type('json');
			   // respondResult = "{" + respondResult +"}";
			   // return res.send(respondResult);
			// }
		 // });
		
	

	
}