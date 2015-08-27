var database = require('./ConnectMysql.js');
exports.Response = function (req , res) {
    
	//var connection = database.getConnection();
    
    var addEquipment = 'insert into tb_userequipment (UserId,UserEquipmentId,EquipmentLevel,LevelCanEquip) value ('
        + req.body.userId
        + ','
        + req.body.userEquipmentId
        + ','
        + req.body.equipmentLevel
        + req.body.levelCanEquip
        + ')';

    var pool = database.getConnectionPool();
    
    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
        }
				
        connection.query(addEquipment, function (err, rows) {
                    // And done with the connection.
                    if (err) {
                        console.log("mysql addEquipment error" + err);
						connection.release();
                        return res.send(err);
                    }
                    connection.release();

                    return res.send("Request successed!");
                });
     });

}