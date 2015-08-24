var database = require('./ConnectMysql.js');


exports.Response = function (req , res) {
    

    var sql = 'select NeedCoin, Level,NeedTime,Title,NeedDiamond from ts_herogradeconfig';
    var pool = database.getConnectionPool();
    
    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
        }
        connection.query(sql, function (err, rows) {
            // And done with the connection.
            
            var result = JSON.stringify(rows);
            
            connection.release();
            
            
            res.type('json');
            return res.send("{ \"data\": " + result + "}");

    // Don't use the connection here, it has been returned to the pool.
        });
    });
    
}