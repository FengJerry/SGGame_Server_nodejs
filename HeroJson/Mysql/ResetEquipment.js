var database = require('./ConnectMysql.js');

exports.Response = function (req , res) {
    

    
    var resetEquipment = 'update tb_userequipment set UserHeroId = null where UserEquipmentId = ' + req.body.userEquipmentId;
	
	
    var pool = database.getConnectionPool();
    
    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
        }

        connection.query(resetEquipment, function (err) {
            // And done with the connection.
			    if (err) {
			        console.log("mysql resetEquipment error" + err);
					connection.release();					
					return res.send(err);
				}

					connection.release();
					return res.send("resetEquipment successed!");
                });
     });

}