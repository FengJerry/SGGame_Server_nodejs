var database = require('./ConnectMysql.js');

exports.Response = function (req, res) {

    // var connection = database.getConnection();


    var sqlUpgradeTime = 'select * from tb_userequipment';

    var pool = database.getConnectionPool();

    res.type('json');

    pool.getConnection(function (err, connection) {
        // Use the connection

        if (err) {
            throw err;
            connection.release();
            return res.send(global.ResponseErr + err.toString() + "\"}");
        }
        connection.query(sqlUpgradeTime, function (err, rows) {
            // And done with the connection.
            if (err) {
                connection.release();
                return res.send(global.ResponseErr + err.toString() + "\"}");
            }

            var result = JSON.stringify(rows);
            //  connection.release();
            connection.release();
            return res.send(global.ResponseMsg + ",\"data\": " + result + "}");

        });
    });

}