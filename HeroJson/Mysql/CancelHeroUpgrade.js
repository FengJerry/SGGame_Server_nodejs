var database = require('./ConnectMysql.js');
exports.Response = function (req, res) {


    var deleteUpgradeHero = 'delete from tb_heroupgrade where IsOver =0 and UserHeroId = ' + req.body.userHeroId;

    var pool = database.getConnectionPool();

    res.type('json');

    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
            connection.release();
            return res.send(global.ResponseErr + err.toString() + "\"}");
        }

        connection.query(deleteUpgradeHero, function (err, rows) {
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