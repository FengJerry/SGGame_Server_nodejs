var database = require('./ConnectMysql.js');


exports.GetResponse = function (req , res) {
    
    var connection = database.getConnection();
    
    var sql = 'select * from ts_equipment'
    
    var pool = database.getConnectionPool();
    
    pool.getConnection(function (err, connection) {
        // Use the connection
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