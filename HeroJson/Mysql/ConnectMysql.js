var mysql = require('mysql');
var settings = require('./Setting.js');
var config = require('./MysqlConfig.json');


exports.getConnection = function (){
    
    console.log(typeof module.exports.connection);

    if (!(typeof module.exports.connection  === 'undefined') ) {

        return module.exports.connection;
    }

    console.log('connect to sql');

    var connection = mysql.createConnection( {
        
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port,
        database:config.database,
        charset:'utf8'

    });

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        
        console.log('connected as id ' + connection.threadId);
    });

    connection.on("close", function (err) {
        console.log("SQL CONNECTION CLOSED.");
    });
    connection.on("error", function (err) {
        console.log("SQL CONNECTION ERROR: ." + err);
    });
    module.exports.connection = connection;

    return module.exports.connection;

}
exports.getConnectionPool = function (){

    
    if (typeof module.exports.connectPool !== "undefined") {

        return module.exports.connectPool;
    }

    var pool = mysql.createPool({
    
        connectionLimit : 15,
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port,
        database: config.database,
        charset: 'utf8'

    });
    
   
    module.exports.pool = pool;
    return module.exports.pool;

}