var database = require('./ConnectMysql.js');

exports.Response = function (req , res) {
    

    
    var setEquipment = 'update tb_userequipment set UserHeroId = ' + req.body.userHeroId + ' where Id = ' + req.body.userEquipmentId;
	
    console.log(setEquipment);
	
    var pool = database.getConnectionPool();
    
    res.type('json');

    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
            connection.release();
            return res.send(global.ResponseErr + err.toString() + "\"}");
        }

        connection.query(setEquipment, function (err) {
            // And done with the connection.
			    if (err) {
			        connection.release();
			        return res.send(global.ResponseErr + err.toString() + "\"}");
				}

					connection.release();
					return res.send(global.ResponseMsg + "}");
                });
     });

}