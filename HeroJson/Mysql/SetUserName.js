var database = require('./ConnectMysql.js');



exports.Response = function (req, res) {
    
    //var connection = database.getConnection();
    //todo: 我要做的饿事
    var addEquipment = 'update  tb_userinfo set   Name = ' + req.body.name + ' where  UserId = ' + req.body.userId;
    +req.body.userId 
        + ',' 
        + req.body.EquipmentId 
        + ',' 
        + req.body.equipmentLevel 
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