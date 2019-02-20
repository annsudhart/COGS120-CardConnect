var data = require('../data.json');

exports.view = function(request, response){
	response.render('contactlist', {		
		"data": data
	});
};