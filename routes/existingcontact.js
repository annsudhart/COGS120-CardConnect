var data = require('../data.json');

exports.viewContact = function(request, response){
	var name = request.params.name;
	var k;
	var output;
	for (k=0; k<data.contact.length; k++) {
		if (data.contact[k].fullName == name) {
			output = data.contact[k];
		}
	}
	
	response.render('existingcontact', {
		"data": output
	});
};

exports.saveContact = function(request, response) {
	var name = request.params.name;
	var k;
	var output;
	for (k=0; k<data.contact.length; k++) {
		if (data.contact[k].fullName == name) {
			data.contact[k].fullName = request.body.name;
			data.contact[k].phone = request.body.phone;
			data.contact[k].email = request.body.email;
			data.contact[k].address = request.body.address;
			data.contact[k].company = request.body.company;
			data.contact[k].website = request.body.website;
			output = data.contact[k];
		}
	}	
	
	response.render('existingcontact', {
		"data": output
	});
};