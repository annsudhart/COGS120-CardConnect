var data = require('../contactdata.json');

exports.viewContact = function(request, response){
	var id = request.params.id;
	console.log(data.id);	
	response.render('existingcontact', {		
		"data": data[id]
	});
};