var database = require('./ConnectMysql.js');
exports.Response = function (req , res) {
    
	//var connection = database.getConnection();
    
	var addHero = 'insert into tb_userhero (UserId,HeroId,HeroLevel) value ('
        + req.body.userId
        + ','
        + req.body.heroId
        + ','
        + req.body.heroLevel
        + ')';

    var pool = database.getConnectionPool();
    
    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
        }
				
        connection.query(addHero, function (err, rows) {
                    // And done with the connection.
                    if (err) {
                        console.log("mysql addHero error" + err);
						connection.release();
                        return res.send(err);
                    }
                    connection.release();

                    return res.send("Request successed!");
                });
     });

}