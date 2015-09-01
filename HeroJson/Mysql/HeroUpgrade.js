var database = require('./ConnectMysql.js');
exports.Response = function (req, res) {



    var queryUpgradeTime = 'select NeedTime from ts_herogradeconfig ' + 'where Level = ' + req.body.heroLevel;
    var insertUpgradeHero = 'insert into tb_heroupgrade (UserId,UserHeroId,HeroLevel,StartTime,EndTime,IsOver) value (' + req.body.userId
	                                                                                                                + ','
                                                                                                                    + req.body.userHeroId
                                                                                                                    + ','
                                                                                                                    + req.body.heroLevel
                                                                                                                    + ','
                                                                                                                    + 'NOW(),TIMESTAMPADD(SECOND,('
                                                                                                                    + queryUpgradeTime
                                                                                                                    + '),NOW())'
                                                                                                                    + ',0)'
    var checkExist = 'SELECT EXISTS(SELECT * FROM tb_heroupgrade WHERE IsOver =0  and  UserHeroId = ' + req.body.userHeroId + ') as exist';
    var pool = database.getConnectionPool();

    res.type('json');

    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
            connection.release();
            return res.send(global.ResponseErr + err.toString() + "\"}");
        }

        connection.query(checkExist, function (err, rows) {
            // And done with the connection.
            if (err) {
                connection.release();
                return res.send(global.ResponseErr + err.toString() + "\"}");
            }

            if (rows[0].exist.toString() == 1) {
                connection.release();
                return res.send(global.ResponseErr + "Hero is upgrading!\"}");
            }
            else {
                connection.query(insertUpgradeHero, function (err, rows) {
                    // And done with the connection.
                    if (err) {
                        connection.release();
                        return res.send(global.ResponseErr + err.toString() + "\"}");
                    }
                    connection.release();

                    return res.send(global.ResponseMsg + "}");
                });

            }
        });
    });

}