var database = require('./ConnectMysql.js');


exports.GetResponse = function (req , res) {
    
    if (global.Equipment !== '') {
        res.type('json');
        return res.send(global.Equipment);
    }
    
    var sql = 'select * from ts_equipment'
    
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
            
            global.Equipment = "{ \"data\": " + result + "}";
            res.type('json');
            return res.send("{ \"data\": " + result + "}");

    // Don't use the connection here, it has been returned to the pool.
        });
    });
    
}