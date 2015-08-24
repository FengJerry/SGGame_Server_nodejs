var database = require('./ConnectMysql.js');

exports.Response = function (req , res) {
    
    // var connection = database.getConnection();
    
    var checkHeroUpgrade = 'select IsOver from tb_heroupgrade where UserHeroId = ' + req.body.userHeroId;
    var checkDeadline = 'SELECT TIMEDIFF((SELECT EndTime FROM tb_heroupgrade WHERE UserHeroId = ' + req.body.userHeroId + '), NOW())  < 0.5 as result';
    var updateIsOver = 'update tb_heroupgrade set IsOver = 1 where UserHeroId = ' +req.body.userHeroId;
    var updateHeroGrade = 'update tb_userhero set HeroLevel = HeroLevel + 1 where UserHeroId = ' + req.body.userHeroId;
    
    var pool = database.getConnectionPool();
    
    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
        }
        
      

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
    });

}