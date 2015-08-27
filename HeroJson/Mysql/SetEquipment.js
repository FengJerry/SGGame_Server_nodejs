var database = require('./ConnectMysql.js');

exports.Response = function (req , res) {
    

    
    var setEquipment = 'update tb_userequipment set UserHeroId = ' + req.body.userHeroId + 'where UserEquipmentId = ' + req.body.userEquipmentId;
	
	
    var pool = database.getConnectionPool();
    
    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
        }

        connection.query(setEquipment, function (err) {
            // And done with the connection.
			    if (err) {
			        console.log("mysql SetEquipment error" + err);
					connection.release();					
					return res.send(err);
				}

					connection.release();
					return res.send("SetEquipment successed!");
                });
     });

}