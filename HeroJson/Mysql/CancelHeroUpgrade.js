var database = require('./ConnectMysql.js');
exports.Response = function (req , res) {
    

    var deleteUpgradeHero = 'delete from tb_heroupgrade where IsOver =0 and UserHeroId = ' + req.body.userHeroId;

    var pool = database.getConnectionPool();
    
    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
        }
				
                connection.query(deleteUpgradeHero, function (err, rows) {
                    // And done with the connection.
                    if (err) {
                        console.log("mysql deleteHero error" + err);
						connection.release();
                        return res.send(err);
                    }
                    connection.release();

                    return res.send("Request successed!");
                });
     });

}