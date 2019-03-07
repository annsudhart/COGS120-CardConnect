
/**
 * Module dependencies.
 */

var express = require('express');
const fileUpload = require('express-fileupload');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var contactlist = require('./routes/contactlist');
var newcontact = require('./routes/newcontact');
var existingcontact = require('./routes/existingcontact');
var editcontact = require('./routes/editcontact');
var index = require('./routes/index');
var newpicture = require('./routes/newpicture')

// Example route
// var user = require('./routes/user');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// default options
app.use(fileUpload());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.view);
app.get('/contactlist', contactlist.view);
app.get('/newcontactA', newcontact.viewA);
app.get('/newcontactB', newcontact.viewB);
app.get('/newpicture', newpicture.view);
app.get('/existingcontact/:name', existingcontact.viewContact);
app.get('/editcontact/:name', editcontact.editContact);
app.post('/existingcontact/:name', existingcontact.saveContact);
app.post('/contactlist', contactlist.addContact);
app.get('/deletecontact/:name', contactlist.deleteContact);
// Example route
// app.get('/users', user.list);

app.post('/upload', function(req, res) {
	let sampleFile = req.files.sampleFile;		// Get the uploaded image from the form
	sampleFile.mv('/public/images/temp.jpg');  // Save the image on to the path you'd like on the server
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
