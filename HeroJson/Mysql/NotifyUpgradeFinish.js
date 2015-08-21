var database = require('./ConnectMysql.js');

exports.Response = function (req , res) {
    
    var connection = database.getConnection();
    
    var checkHeroUpgrade = 'select IsOver from tb_heroupgrade where UserHeroId = ' + connection.escape(req.body.userHeroId);
    var checkDeadline = 'SELECT TIMEDIFF((SELECT EndTime FROM tb_heroupgrade WHERE UserHeroId = ' + connection.escape(req.body.userHeroId) + '), NOW())  < 0.5 as result';
    var updateIsOver = 'update tb_heroupgrade set IsOver = 1 where UserHeroId = ' + connection.escape(req.body.userHeroId);
    var updateHeroGrade = 'update tb_userhero set HeroLevel = HeroLevel + 1 where UserHeroId = ' + connection.escape(req.body.userHeroId);
    
    var pool = database.getConnectionPool();
    
    pool.getConnection(function (err, connection) {
        // Use the connection
        
        
        connection.query(checkHeroUpgrade, function (err, rows) {
            // And done with the connection.
            if (err) {
                console.log("mysql checkUpgradeHero error" + err);
                connection.release();
                return res.send(err);
            }
            
            if (rows[0].IsOver.toString() == 1) {
                connection.release();
                return res.send("Upgrade Done!");
            }
            else if (rows[0].IsOver.toString() == 0) {
                connection.query(checkDeadline, function (err, rows) {
                    if (err) {
                        console.log("mysql checkDeadline error" + err);
                        connection.release();
                        return res.send(err);
                    }
                    
                    if (rows[0].result.toString() == 0) {
                        connection.release();
                        return res.send("The hero is upgrading!");
						
                    }
                    else if (rows[0].result.toString() == 1) {
                        connection.query(updateIsOver, function (err, rows) {
                            if (err) {
                                console.log("mysql updateIsOver error" + err);
                                connection.release();
                                return res.send(err);
                            }
                            
                            connection.query(updateHeroGrade, function (err, rows) {
                                if (err) {
                                    console.log("mysql updateHeroGrade error" + err);
                                    connection.release();
                                    return res.send(err);
                                }
                                connection.release();
                                return res.send("heroUpgrade committed!");
									
                            });
                        });
                    }
                });
            }
        });
    });
}