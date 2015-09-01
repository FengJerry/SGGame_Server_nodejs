var database = require('./ConnectMysql.js');

exports.Response = function (req, res) {



    var resetEquipment = 'update tb_userequipment set UserHeroId = null where UserEquipmentId = ' + req.body.userEquipmentId;


    var pool = database.getConnectionPool();

    res.type('json');

    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
            connection.release();
            return res.send(global.ResponseErr + err.toString() + "\"}");
        }

        connection.query(resetEquipment, function (err) {
            // And done with the connection.
            if (err) {
                connection.release();
                return res.send(global.ResponseErr + err.toString() + "\"}");
            }

            connection.release();
            return res.send(global.ResponseMsg + "}");
        });
    });

}