
/**
 * Module dependencies.
 */

var express = require('express');
const fileUpload = require('express-fileupload');
var multer  = require('multer');

var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var contactlist = require('./routes/contactlist');
var newcontact = require('./routes/newcontact');
var existingcontact = require('./routes/existingcontact');
var editcontact = require('./routes/editcontact');
var index = require('./routes/index');
var newpicture = require('./routes/newpicture')

var upload = multer({ dest: 'uploads/' });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')

    console.log("Set destination to uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())

    console.log("Filename " + file.fieldname);
  }
})

upload = multer({ storage: storage });

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
//app.post('/newcontact/add', newcontact.addContact);
app.get('/existingcontact/:name', existingcontact.viewContact);
app.get('/editcontact/:name', editcontact.editContact);
//app.post('/editcontact/:name/save', editcontact.saveContact);
app.post('/existingcontact/:name', existingcontact.saveContact);
app.post('/contactlist', contactlist.addContact);
app.get('/deletecontact/:name', contactlist.deleteContact);
app.get('/uploads/:photo', function (req, res) {
	var filename = req.params.photo;
  res.sendFile(path.join(__dirname, `/uploads/${filename}`));
  
  console.log("Sent to " + path.join(__dirname, `/uploads/${filename}`));
});

// Example route
// app.get('/users', user.list);

/*
app.post('/upload', function(req, res) {
	let sampleFile = req.files.sampleFile;		// Get the uploaded image from the form
	sampleFile.mv('/public/images/temp.jpg');  // Save the image on to the path you'd like on the server
});
*/

app.post('/upload-photo', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  (upload.single('avatar'))(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log("Multer error uploading.");
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log("Unknown error uploading.");
    }
 
    // Everything went fine.
    console.log('Correctly uploading ' + req.params.avatar);
    
  });

  

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
