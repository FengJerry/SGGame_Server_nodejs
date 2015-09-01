var database = require('./ConnectMysql.js');

exports.Response = function (req, res) {


    // var checkHeroUpgrade = 'select IsOver from tb_heroupgrade where UserHeroId = ' + connection.escape(req.body.userHeroId);
    // var checkDeadline = 'SELECT TIMEDIFF((SELECT EndTime FROM tb_heroupgrade WHERE UserHeroId = ' + connection.escape(req.body.userHeroId) + '), NOW())  < 0.5 as result';
    // var updateIsOver = 'update tb_equipmentupgrade set IsOver = 1 where UserEquipmentId = ' + req.body.userEquipmentId;
    var updateHeroGrade = 'update tb_userequipment set EquipmentLevel = EquipmentLevel + 1 where UserEquipmentId = ' + req.body.userEquipmentId;

    var pool = database.getConnectionPool();

    res.type('json');

    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
            connection.release();
            return res.send(global.ResponseErr + err.toString() + "\"}");
        }



        connection.query(updateHeroGrade, function (err, rows) {
            if (err) {
                connection.release();
                return res.send(global.ResponseErr + err.toString() + "\"}");
            }


            connection.release();
            return res.send(global.ResponseMsg + "}");

        });
    });

}