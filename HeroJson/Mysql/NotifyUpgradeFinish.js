var database = require('./ConnectMysql.js');

exports.Response = function (req, res) {

    // var connection = database.getConnection();

    var checkHeroUpgrade = 'select IsOver from tb_heroupgrade where UserHeroId = ' + req.body.userHeroId;
    var checkDeadline = 'SELECT TIMEDIFF((SELECT EndTime FROM tb_heroupgrade WHERE UserHeroId = ' + req.body.userHeroId + '), NOW())  < 0.5 as result';
    var updateIsOver = 'update tb_heroupgrade set IsOver = 1 where UserHeroId = ' + req.body.userHeroId;
    var updateHeroGrade = 'update tb_userhero set HeroLevel = HeroLevel + 1 where UserHeroId = ' + req.body.userHeroId;

    var pool = database.getConnectionPool();

    res.type('json');

    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
            connection.release();
            return res.send(global.ResponseErr + err.toString() + "\"}");
        }



        connection.query(updateIsOver, function (err, rows) {
            if (err) {
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
    });

}