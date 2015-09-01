//static variable
global.Hero = '';
global.Equipment = '';
global.ResponseMsg = "{ \"SuccessOrNot\":1";
global.ResponseErr = "{ \"SuccessOrNot\":0, \"error\":\"";

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var heroInfo = require('./Mysql/Hero.js');
var itemInfo = require('./Mysql/Item.js');
var skillInfo = require('./Mysql/Skill.js');
var test = require('./Test/TestPostJson.js');
var getUserInfo = require('./Mysql/GetUserInfo.js');
var getUpgradeTime = require('./Mysql/GetUpgradeTime.js');
var updateUserInfo = require('./Mysql/UpdateUserInfo.js');
var heroUpgrade = require('./Mysql/HeroUpgrade.js');
var cancelHeroUpgrade = require('./Mysql/CancelHeroUpgrade.js');
var checkHeroUpgrade = require('./Mysql/CheckHeroUpgrade.js');
var heroUpgradeConfig = require('./Mysql/HeroUpgradeConfig.js');
var notifyHeroUpgradeFinish = require('./Mysql/NotifyUpgradeFinish.js');
var notifyEquipmentUpgrade = require('./Mysql/NotifyEquipmentUpgrade.js');
var addHero = require('./Mysql/AddHero.js');
var addEquipment = require('./Mysql/AddEquipment.js');
var setEquipment = require('./Mysql/SetEquipment.js');
var resetEquipment = require('./Mysql/ResetEquipment.js');
var refreshHeroEquipment = require('./Mysql/RefreshHeroEquipment.js')
var getNotice = require('./Mysql/Notice.js');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.multipart());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.get('/hero', heroInfo.GetResponse);
app.get('/equipment', itemInfo.GetResponse);
app.get('/skill', skillInfo.GetResponse);
app.post('/testJson', test.Response);
app.post('/getuserinfo', getUserInfo.Response);
app.get('/getupgradetime', getUpgradeTime.Response);
app.post('/updateuserinfo', updateUserInfo.Response);
app.post('/upgradehero', heroUpgrade.Response);
app.post('/cancelupgradehero', cancelHeroUpgrade.Response);
app.post('/checkheroupgrade', checkHeroUpgrade.Response);
app.get('/heroupgradeconfig', heroUpgradeConfig.Response);
app.post('/notifyHeroUpgradeFinish', notifyHeroUpgradeFinish.Response);
app.post('/notifyEquipmentUpgrade', notifyEquipmentUpgrade.Response);
app.post('/addhero', addHero.Response);
app.post('/addequipment', addEquipment.Response);
app.post('/setequipment', setEquipment.Response);
app.post('/resetequipment', resetEquipment.Response);
app.post('/getnotice', getNotice.GetResponse);
app.get('/refreshheroequipment', refreshHeroEquipment.GetResponse);


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
