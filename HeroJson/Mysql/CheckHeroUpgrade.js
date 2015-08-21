var database = require('./ConnectMysql.js');

exports.Response = function (req , res) {
    
	var connection = database.getConnection();
    
    var selectAllSql = ' select  UserHeroId , StartTime , EndTime , IsOver from tb_heroupgrade where UserId = ' +connection.escape(req.body.userId);

    var pool = database.getConnectionPool();
    
    pool.getConnection(function (err, connection) {
        // Use the connection
   
				
                connection.query(selectAllSql, function (err, rows) {
                    // And done with the connection.
                    if (err) {
                        console.log("mysql checkUpgradeHero error" + err);
						connection.release();
                        return res.send(err);
                    }
            
                    var array = new Array();
                    for (var  i = 0; i < rows.length ; i++) {
                
                        if (rows[i].IsOver.toString() == 1) {
					

                        }
                        else if (rows[i].IsOver.toString() == 0) {
                    
                            var timeNow = new Date()
                            var timediff =rows[i].EndTime.getTime() - timeNow.getTime();
                            var seconds = Math.round(timediff / 1000)
                            var json = {
                                UserHeroId: rows[i].UserHeroId, NeedTime: seconds
                             };

                            array.push(json);
                        }
                    }
                        var result = JSON.stringify(array);
                    
                        result = "{\"data\": " + result + "}";
                        connection.release();
                        res.type('json');
                        return res.send(result);	
			});
     });
}