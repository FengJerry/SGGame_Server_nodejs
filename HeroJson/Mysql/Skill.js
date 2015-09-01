var database = require('./ConnectMysql.js');


exports.GetResponse = function (req , res) {
    

    
    var sql = 'select * from ts_skill'
    
    var pool = database.getConnectionPool();
    
    res.type('json');

    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
            connection.release();
            return res.send(global.ResponseErr + err.toString() + "\"}");
        }
        connection.query(sql, function (err, rows) {
            // And done with the connection.
            if (err) {
                connection.release();
                return res.send(global.ResponseErr + err.toString() + "\"}");
            }
            var result = JSON.stringify(rows);
            
            connection.release();
            return res.send(global.ResponseMsg + ",\"data\": " + result + "}");

    // Don't use the connection here, it has been returned to the pool.
        });
    });
    
}
