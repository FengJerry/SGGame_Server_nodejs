var database = require('./ConnectMysql.js');


exports.GetResponse = function (req, res) {


    var sqlEquipment = 'select * from ts_equipment'
    var sqlHero = 'select * from ts_hero where InUse = 1';

    var pool = database.getConnectionPool();

    res.type('json');

    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
            connection.release();
            return res.send(global.ResponseErr + err.toString() + "\"}");
        }

        connection.query(sqlEquipment, function (err, rows) {
            // And done with the connection.
            if (err) {
                connection.release();
                return res.send(global.ResponseErr + err.toString() + "\"}");
            }

            var result = JSON.stringify(rows);

            global.Equipment = "{ \"data\": " + result + "}";

            connection.query(sqlHero, function (err, rows) {
                // And done with the connection.
                if (err) {
                    connection.release();
                    return res.send(global.ResponseErr + err.toString() + "\"}");
                }

                var result = JSON.stringify(rows);

                global.Hero = "{ \"data\": " + result + "}";
                connection.release();
                return res.send(global.ResponseMsg + "}");
                //    return res.send(global.ResponseMsg + global.Hero + global.Equipment +"}");

                // Don't use the connection here, it has been returned to the pool.
            });

            // Don't use the connection here, it has been returned to the pool.
        });
    });

}