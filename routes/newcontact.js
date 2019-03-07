var data = require("../data.json");

exports.viewA = function(request, response){
	response.render('newcontactA', data);
};

exports.viewB = function(request, response){
	response.render('newcontactB', data);
};