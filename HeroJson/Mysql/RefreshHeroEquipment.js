var database = require('./ConnectMysql.js');


exports.GetResponse = function (req , res) {
    

    var sqlEquipment = 'select * from ts_equipment'
    var sqlHero = 'select * from ts_hero where InUse = 1';

    var pool = database.getConnectionPool();
    
    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
        }

        connection.query(sqlEquipment, function (err, rows) {
            // And done with the connection.
            
            var result = JSON.stringify(rows);
  
            global.Equipment = "{ \"data\": " + result + "}";

            connection.query(sqlHero, function (err, rows) {
                // And done with the connection.

                var result = JSON.stringify(rows);

                global.Hero = "{ \"data\": " + result + "}";
                connection.release();
                return res.send("Refresh Success!");

                // Don't use the connection here, it has been returned to the pool.
            });

    // Don't use the connection here, it has been returned to the pool.
        });
    });
    
}