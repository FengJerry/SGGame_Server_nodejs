var database = require('./ConnectMysql.js');


exports.GetResponse = function (req , res) {
    
    if (global.Hero !== '') {
        res.type('json');
        return res.send(global.Hero);
    }

    var sql = 'select * from ts_hero where InUse = 1';
    
    var pool = database.getConnectionPool();
    
    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
        }

        connection.query(sql, function (err, rows) {
            // And done with the connection.
            if (err) {
                console.log("mysql GetHero error" + err);
                connection.release();
                return res.send(err);
            }
            var result = JSON.stringify(rows);
            
            connection.release();
            global.Hero = "{ \"data\": " + result + "}";
            res.type('json');
            return res.send("{ \"data\": " + result +"}");

    // Don't use the connection here, it has been returned to the pool.
        });
    });
    
}
