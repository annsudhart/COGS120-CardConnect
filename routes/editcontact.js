var data = require('../data.json');

exports.editContact = function(request, response) {
	var name = request.params.name;
	var k;
	var output;
	for (k=0; k<data.contact.length; k++) {
		if (data.contact[k].fullName == name) {
			output = data.contact[k];
		}
	}
	
	response.render('editcontact', {
		"data": output
	});
};
