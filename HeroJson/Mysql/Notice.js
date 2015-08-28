var database = require('./ConnectMysql.js');


exports.GetResponse = function (req , res) {
    
    
    
    var sql = 'select top 10 from tb_news'
    
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
            
        });
    });
    
}