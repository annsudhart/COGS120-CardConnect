
/**
 * Module dependencies.
 */

var express = require('express');
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

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')

    console.log("Set destination to uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    path.extname(file.originalname);
    console.log("Filename " + file.fieldname + path.extname(file.originalname));
  }
})

var upload = multer({
  storage : storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'));
    }
    callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }
}).single('avatar');


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

app.post('/upload',function(req,res){

  upload(req,res,function(err) {
      if(err) {
          return res.end("Error uploading file.");
      }
      res.end("File is uploaded");
  });

  res.redirect(301, 'newcontactB');
  res.end();
});

app.listen(3001,function(){
  console.log("Working on port 3000");
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
