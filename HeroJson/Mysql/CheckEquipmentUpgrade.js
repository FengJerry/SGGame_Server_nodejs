var database = require('./ConnectMysql.js');

exports.Response = function (req, res) {

    var connection = database.getConnection();

    var selectAllSql = ' select  UserEquipmentId , StartTime , EndTime , IsOver from tb_equipmentupgrade where UserId = ' + connection.escape(req.body.userId);

    var pool = database.getConnectionPool();

    res.type('json');

    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
            connection.release();
            return res.send(global.ResponseErr + err.toString() + "\"}");
        }

        connection.query(selectAllSql, function (err, rows) {
            // And done with the connection.
            if (err) {
                connection.release();
                return res.send(global.ResponseErr + err.toString() + "\"}");
            }

            var array = new Array();
            for (var i = 0; i < rows.length ; i++) {

                if (rows[i].IsOver.toString() == 1) {


                }
                else if (rows[i].IsOver.toString() == 0) {

                    var timeNow = new Date()
                    var timediff = rows[i].EndTime.getTime() - timeNow.getTime();
                    var seconds = Math.round(timediff / 1000)
                    var json = {
                        UserHeroId: rows[i].UserHeroId, NeedTime: seconds
                    };

                    array.push(json);
                }
            }
            var result = JSON.stringify(array);

            connection.release();
            return res.send(global.ResponseMsg + ",\"data\": " + result + "}");
        });
    });
}