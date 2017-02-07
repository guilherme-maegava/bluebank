var bodyParser = require('body-parser');
var config = require('config');
var database = require('mongoose');
var express = require('express');
var routes = require('./app/routes');

var app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/bower_components"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

/*app.get('/', function(req, res){
	res.redirect('/index.html');
});*/

app.listen(3000, function(){
	console.log("BlueBank's Server listen on port: " + this.address().port);
});