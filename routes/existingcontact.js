var data = require('../data.json');

exports.viewContact = function(request, response){
	var name = request.params.name;
	response.render('existingcontact', {		
		"data": data[name]
	});
};