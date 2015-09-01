var database = require('./ConnectMysql.js');

exports.Response = function (req , res) {
    
    // var connection = database.getConnection();
    
    
    var sql = 'select * from ts_herooccupation';
    
    var pool = database.getConnectionPool();
    
    pool.getConnection(function (err, connection) {
        // Use the connection
        
        if (err) {
            throw err;
        }
        connection.query(sql, function (err, rows) {
            // And done with the connection.
            if (err) {
                console.log("mysql checkUpgradeHero error" + err);
                connection.release();
                return res.send(err);
            }
            
            var result = JSON.stringify(rows);
            //  connection.release();
            result = "\"data\": " + result + ",";
            connection.release();
            res.type('json');
            return res.send(result);

        });
    });

}