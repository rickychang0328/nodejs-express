
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var hello = require('./routes/hello');
var version = require('./routes/version');
var app = express();
var api = require('./routes/api');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vcard');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('MongoDB: connected.');	
});
// all environments
var Schema = mongoose.Schema;
var vcardSchema = mongoose.Schema({
    name: String,
    nickname: String,
    tel: String
})

app.db = {
	model: mongoose.model('Vcard', vcardSchema)
};
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/hello', hello.index);
app.get('/version', version.index);
// app.get('/info/:username', user.info);
// REST API
app.post('/1/user', api.create);
app.get('/1/user', api.read);
app.put('/1/user/:nickname', api.update);
app.delete('/1/user/:nickname', api.delete);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
