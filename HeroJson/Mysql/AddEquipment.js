var database = require('./ConnectMysql.js');
exports.Response = function (req, res) {

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

    res.type('json');

    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
            connection.release();
            return res.send(global.ResponseErr + err.toString() + "\"}");
        }

        connection.query(addEquipment, function (err, rows) {
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