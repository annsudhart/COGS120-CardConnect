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
<<<<<<< HEAD
		"url": url,
		"img": true
	});
=======
		"url": url, 
		"img": true
	}); 
>>>>>>> 4968731f3f887e5964564ca78b68226a71ae7f32
	console.log(url);
};
