function initCamera() {
    // Uncomment and fill in the correct selectors below.
    capture($('#camera-video'),
            $('#camera-canvas'),
            $('#camera-button'));
  
    // For Reference:
    // capture($('#camera-video'),
    //       $('#camera-canvas'),
    //       $('#camera-button'));
  }
  
  function capture(video, canvas, snapshotButton) {
    //Adopted from https://dev.opera.com/articles/media-capture-in-mobile-browsers/
    //Setup navigator for all versions of browsers.
    navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia || navigator.msGetUserMedia;
    var ctx = canvas[0].getContext('2d');
  
    var successCallback = function(mediaStream) {
      //The success callback function. On user click of snapshot button,
      //draw the image on the canvas.
      // video.attr('src', window.URL.createObjectURL(mediaStream));
      var vid = document.querySelector('#camera-video');
      vid.srcObject = mediaStream;
      snapshotButton.click(function(e) {
          console.log("Taking photo");
          //Calculate dimension of photo from the video element.
          var width = video.width();
          var height = video.height();
          
          canvas.attr('width', width);
          canvas.attr('height', height);
          ctx.drawImage(video[0], 0, 0, width, height);
      });
    };
  
    var errorCallback = function() {
      //The error callback function. If getUserMedia errored, print that
      //we failed.
      console.log('Capture failed');
    };
  
    //Register the success and error callbacks with getUserMedia.
    navigator.getUserMedia({ 'video': true },
        successCallback, errorCallback);
  
  };
  
  