var database = require('./ConnectMysql.js');
exports.Response = function (req, res) {

    //var connection = database.getConnection();

    var addHero = 'insert into tb_userhero (UserId,HeroId,HeroLevel) value ('
        + req.body.userId
        + ','
        + req.body.heroId
        + ','
        + req.body.heroLevel
        + ')';

    var pool = database.getConnectionPool();

    res.type('json');

    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
            connection.release();
            return res.send(global.ResponseErr + err.toString() + "\"}");
        }

        connection.query(addHero, function (err, rows) {
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