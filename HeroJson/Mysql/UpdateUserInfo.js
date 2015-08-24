var database = require('./ConnectMysql.js');

exports.Response = function (req , res) {
    
	var connection = database.getConnection();
    
	var sqlUpdate = 'update tb_userinfo set ' + checkGold() 
											  + checkDiamond()
											  + checkStamina()
                                              + 'where UserId = ' + connection.escape(req.body.userId);
	
	
	function checkGold(){
			    if (!(typeof req.body.gold  === 'undefined') ) {
					return 'Gold = Gold + ' + connection.escape(req.body.gold) + ' ';
				}
				else{
				return '';
				}
	}
	
	function checkDiamond(){
				var result = '';
				if(checkGold() !== '')
				result = ',';
			    if (!(typeof req.body.diamond  === 'undefined') ) {
					result = result + 'Diamond = Diamond + ' + connection.escape(req.body.diamond)+ ' ';
					return result;
				}
				else{
				return '';
				}
	}
	
	function checkStamina(){
					var result = '';
				if(checkDiamond() !== '')
				result = ',';
			    if (!(typeof req.body.stamina  === 'undefined') ) {
					result = result + 'Stamina = Stamina + ' + connection.escape(req.body.stamina)+ ' ';
					return result;
				}
				else{
				return '';
				}
	}
	
    var pool = database.getConnectionPool();
    
    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
        }

        connection.query(sqlUpdate, function (err) {
            // And done with the connection.
			    if (err) {
					console.log("mysql getUpdate error" + err); 
					connection.release();					
					return res.send(err);
				}

					connection.release();
					return res.send("Update successed!");
                });
     });

}