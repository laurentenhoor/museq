var express = require('express');
var app = express();
var passport = require('passport');
var bodyParser  = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'jade');

var frontend_routes 	= require('./routes/frontend');
var api_v1_routes 		= require('./routes/api_v1');
app.use('/', frontend_routes);
app.use('/api/v1', api_v1_routes)

app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());

var portNr 		= 80;

app.listen(portNr, function () {
  console.log('Museq listening on port '+portNr+'!');
});