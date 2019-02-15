$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$.get('data.json', callbackFunction);
}

function callbackFunction(data) {
	console.log(data);
}