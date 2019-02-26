var data = require('../data.json');

exports.view = function(request, response) {
	response.render('contactlist', {
		"data": data
	});
};

exports.addContact = function(request, response) {
	var name = request.body.name;
	var newContact = {
			"fullName": request.body.name,
			"phone": request.body.phone,
			"email": request.body.email,
			"address": request.body.address,
			"company": request.body.company,
			"website": request.body.website,
			"image": "placeholder.svg"
		}
	data.contact.push(newContact);

	response.render('contactlist', {
		"data": data
	});
	response.redirect('contactlist')
};

exports.deleteContact = function(request, response) {
	var name = request.params.name;
	var k;
	for (k=0; k<data.contact.length; k++) {
		if (data.contact[k].fullName == name) {
			data.contact.splice(k, 1);
		}
	}

	response.render('contactlist', {
		"data": data
	});
	response.redirect('contactlist')
}
