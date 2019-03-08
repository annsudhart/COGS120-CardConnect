var dataURL;

function saveCanvasImage() {
    var canvas = document.getElementById('camera-canvas');
    var context = canvas.getContext('2d');

    dataURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	$("#url").val(dataURL);
	console.log(dataURL);
}

function getCanvasImage() {
    return dataURL;
}

function useDefaultImage() {
    window.location = "/newcontactB";
}