
function initialize() {
  var panoramaOptions = {
    pano: '6xCnRwAoMAdKuPzjd3WGsA',
    pov: {
      heading: 270,
      pitch: 0
    },
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
