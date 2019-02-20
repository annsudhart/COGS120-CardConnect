var data = require("../data.json");

exports.view = function(request, response){
	response.render('newcontact');
};

exports.addContact = function(request, response){
	var name = request.body.name;
	var newContact = {
			"fullName": request.body.name,
			"phone": request.body.phone,
			"email": request.body.email,
			"address": request.body.address,
			"company": request.body.company,
			"website": request.body.website,
			"image": "placeholder.png"
		}
	data.contact.push(newContact);
	
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
}