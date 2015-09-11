var database = require('./ConnectMysql.js');
exports.Response = function (req, res) {
    
    //var connection = database.getConnection();
    //todo: 我要做的饿事
    var removeEquipment = 'delete from tb_userequipment where Id = ' + req.body.Id +' and userId = '+req.body.userId;
    
    var pool = database.getConnectionPool();
    
    res.type('json');
    
    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
            connection.release();
            return res.send(global.ResponseErr + err.toString() + "\"}");
        }
        
        connection.query(removeEquipment, function (err, rows) {
            // And done with the connection.
            if (err) {
                connection.release();
                return res.send(global.ResponseErr + err.toString() + "\"}");
            }
            return res.send(global.ResponseMsg + "}");
            
        });
    });

}