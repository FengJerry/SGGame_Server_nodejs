var database = require('./ConnectMysql.js');

exports.Response = function (req, res) {



    var sqlUpdate = 'update tb_userinfo set ' + checkGold()
											  + checkDiamond()
											  + checkStamina()
											  + checkPowder()
											  + checkGreenFragment()
											  + checkBlueFragment()
											  + checkPurpleFragment()
                                              + 'where UserId = ' + req.body.userId;

    var sqlUser = 'select UserId,Gold,Diamond,Stamina,Powder,GreenFragment,BlueFragment,PurpleFragment from tb_userinfo where userId = ' + req.body.userId;


    var pool = database.getConnectionPool();

    res.type('json');

    pool.getConnection(function (err, connection) {
        // Use the connection
        if (err) {
            throw err;
            connection.release();
            return res.send(global.ResponseErr + err.toString() + "\"}");
        }

        connection.query(sqlUpdate, function (err) {
            // And done with the connection.
            if (err) {
                connection.release();
                return res.send(global.ResponseErr + err.toString() + "\"}");
            }
            connection.query(sqlUser, function (err, rows) {
                // And done with the connection.
                if (err) {
                    connection.release();
                    return res.send(global.ResponseErr + err.toString() + "\"}");
                }
                var result = JSON.stringify(rows[0]);
                //  connection.release();
                res.type('json');
                connection.release();
                return res.send(global.ResponseMsg + ",\"data\": " + result + "}");
            });
        });
    });

        function checkGold() {
            if (!(typeof req.body.gold === 'undefined')) {
                return 'Gold = Gold + ' + req.body.gold + ' ';
            } else {
                return '';
            }
        }

        function checkDiamond() {
            var result = '';
            if (checkGold() !== '')
                result = ',';
            if (!(typeof req.body.diamond === 'undefined')) {
                result = result + 'Diamond = Diamond + ' + req.body.diamond + ' ';
                return result;
            } else {
                return '';
            }
        }

        function checkStamina() {
            var result = '';
            if (checkDiamond() !== '')
                result = ',';
            if (!(typeof req.body.stamina === 'undefined')) {
                result = result + 'Stamina = Stamina + ' + req.body.stamina + ' ';
                return result;
            } else {
                return '';
            }
        }

        function checkPowder() {
            var result = '';
            if (checkStamina() !== '')
                result = ',';
            if (!(typeof req.body.powder === 'undefined')) {
                result = result + 'Powder = Powder + ' + req.body.powder + ' ';
                return result;
            } else {
                return '';
            }
        }

        function checkGreenFragment() {
            var result = '';
            if (checkPowder() !== '')
                result = ',';
            if (!(typeof req.body.greenfragment === 'undefined')) {
                result = result + 'GreenFragment = GreenFragment + ' + req.body.greenfragment + ' ';
                return result;
            } else {
                return '';
            }
        }

        function checkBlueFragment() {
            var result = '';
            if (checkGreenFragment() !== '')
                result = ',';
            if (!(typeof req.body.bluefragment === 'undefined')) {
                result = result + 'BlueFragment = BlueFragment + ' + req.body.bluefragment + ' ';
                return result;
            } else {
                return '';
            }
        }

        function checkPurpleFragment() {
            var result = '';
            if (checkBlueFragment() !== '')
                result = ',';
            if (!(typeof req.body.purpleFragment === 'undefined')) {
                result = result + 'PurpleFragment = PurpleFragment + ' + req.body.purpleFragment + ' ';
                return result;
            } else {
                return '';
            }
        }

   

}