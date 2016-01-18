
function initialize() {
  var panoramaOptions = {
    pov: {
      heading: 86.87475001019146,
      pitch: 12.290950042221624,
      zoom: 1
    },
    pano: 'ISocJjqdFmmrm_P5qDLM9Q',
    visible: true,
    imageDateControl: true
  };
  window.panorama1 = new google.maps.StreetViewPanorama(document.getElementById('pano1'), panoramaOptions);

  panoramaOptions.addressControl = false;
  panoramaOptions.linksControl = false;
  panoramaOptions.panControl = false;
  panoramaOptions.zoomControl = false;

  window.panorama2 = new google.maps.StreetViewPanorama(document.getElementById('pano2'), panoramaOptions);

  var eventLock = false;

  google.maps.event.addListener(panorama1, 'position_changed', function() {
    if (!eventLock) {
      eventLock = true;
      panorama2.setPosition(panorama1.getPosition());
      eventLock = false;
    }
  });

  google.maps.event.addListener(panorama1, 'pov_changed', function() {
    if (!eventLock) {
      eventLock = true;
      panorama2.setPov(panorama1.getPov());
      eventLock = false;
    }
  });

  google.maps.event.addListener(panorama1, 'zoom_changed', function() {
    if (!eventLock) {
      eventLock = true;
      panorama2.setZoom(panorama1.getZoom());
      eventLock = false;
    }
  });

  google.maps.event.addListener(panorama2, 'pov_changed', function() {
    if (!eventLock) {
      eventLock = true;
      panorama1.setPov(panorama2.getPov());
      eventLock = false;
    }
  });

  google.maps.event.addListener(panorama2, 'zoom_changed', function() {
    if (!eventLock) {
      eventLock = true;
      panorama1.setZoom(panorama2.getZoom());
      eventLock = false;
    }
  });

  $("[data-pano]").click(function() {
    console.log($(this).attr('data-pano'));
    panorama1.setPano($(this).attr('data-pano'));
  })
}

google.maps.event.addDomListener(window, 'load', initialize);


// Video

$('.close-video').on('click', closeVideo)
$('.streetwalk').on('ended', closeVideo)
$('.show-streetwalk').click(openVideo)

function closeVideo () {
  // If user re-opens video, don't close it when video ends
  $('.streetwalk').off('ended', closeVideo)
  $('.streetwalk')[0].pause()

  $('.fullscreen-video').fadeOut(400, function () {
    $(this).hide()
  })
}

function openVideo () {
  $('.fullscreen-video').show()
  $('.streetwalk')[0].currentTime = 0
  $('.streetwalk')[0].play()
}
