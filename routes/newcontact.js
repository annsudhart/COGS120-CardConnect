var data = require("../data.json");

exports.viewA = function(request, response){
	response.render('newcontactA');
};

exports.viewB = function(request, response){
	response.render('newcontactB', {"img": false});
};

exports.processImage = function(request, response) {
	var url = request.body.url;
	response.render("newcontactB", {
		"url": url, 
		"img": "false"
	}); 
	console.log(url);
};