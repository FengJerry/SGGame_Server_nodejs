var database = require('./ConnectMysql.js');
exports.Response = function (req, res) {

 

    var advanceHero = 'update tb_userhero set Advance = Advance + 1 where UserHeroId = '+ req.body.userHeroId;

    var pool = database.getConnectionPool();

    res.type('json');

    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
            connection.release();
            return res.send(global.ResponseErr + err.toString() + "\"}");
        }

        connection.query(advanceHero, function (err, rows) {
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