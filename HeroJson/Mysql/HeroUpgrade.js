var database = require('D:/Node.js/HeroJson/HeroJson/Mysql/ConnectMysql.js');
exports.Response = function (req , res) {
    
	var connection = database.getConnection();
    
	var queryUpgradeTime = 'select NeedTime from ts_herogradeconfig ' + 'where Level = ' + connection.escape(req.body.heroLevel);
	var insertUpgradeHero = 'insert into tb_heroupgrade (UserId,UserHeroId,HeroLevel,StartTime,EndTime,IsOver) value (' + connection.escape(req.body.userId)
	                                                                                                                + ','
                                                                                                                    + connection.escape(req.body.userHeroId)
                                                                                                                    + ','
                                                                                                                    + connection.escape(req.body.heroLevel)
                                                                                                                    + ','
                                                                                                                    + 'NOW(),TIMESTAMPADD(SECOND,('
                                                                                                                    + queryUpgradeTime
                                                                                                                    + '),NOW())'
                                                                                                                    + ',0)'

    var pool = database.getConnectionPool();
    
    pool.getConnection(function (err, connection) {
        // Use the connection
   
				
                connection.query(insertUpgradeHero, function (err, rows) {
                    // And done with the connection.
                    if (err) {
                        console.log("mysql upgradeHero error" + err);
						connection.release();
                        return res.send(err);
                    }
                    connection.release();

                    return res.send("Request successed!");
                });
     });

}