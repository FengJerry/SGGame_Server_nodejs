var database = require('./ConnectMysql.js');
exports.Response = function (req, res) {



    var sqlUser = 'select UserId,Gold,Diamond,Stamina, SoulStone from tb_userinfo where userId = ' + req.body.userId;

    var sqlHero = 'select UserHeroId, HeroId,HeroLevel from tb_userhero where userId = ' + req.body.userId;

    var sqlEquipment = 'select * from tb_userequipment where userId = ' + req.body.userId;

    var pool = database.getConnectionPool();

    res.type('json');

    pool.getConnection(function (err, connection) {

        if (err) {
            throw err;
            connection.release();
            return res.send(global.ResponseErr + err.toString() + "\"}");
        }



        var respondResult = "";
        // Use the connection
        connection.query(sqlUser, function (err, rows) {
            // And done with the connection.
            if (err) {
                connection.release();
                return res.send(global.ResponseErr + err.toString() + "\"}");
            }
            var result = JSON.stringify(rows[0]);
            //  connection.release();
            respondResult += "\"data\": " + result + ",";


            connection.query(sqlHero, function (err, rows) {
                if (err) {
                    connection.release();
                    return res.send(global.ResponseErr + err.toString() + "\"}");
                }
                var result = JSON.stringify(rows);
                // connection.release();

                respondResult += "\"heroConfig\": " + result + ",";

                connection.query(sqlEquipment, function (err, rows) {
                    if (err) {
                        connection.release();
                        return res.send(global.ResponseErr + err.toString() + "\"}");
                    }
                    var result = JSON.stringify(rows);
                    // connection.release();
                    respondResult += "\"equipmentConfig\": " + result;
                    connection.release();
                    respondResult = "{" + respondResult + "}";
                    return res.send(respondResult);
                });
            });
        });
    });

}