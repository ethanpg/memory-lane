
function initialize() {
  var panoramaOptions = {
    pano: '6xCnRwAoMAdKuPzjd3WGsA',
    pov: {
      heading: 270,
      pitch: 0
    },
    visible: true,
    imageDateControl: true,
    addressControl: true
  };
  window.panorama1 = new google.maps.StreetViewPanorama(document.getElementById('pano1'), panoramaOptions);
  window.panorama2 = new google.maps.StreetViewPanorama(document.getElementById('pano2'), panoramaOptions);

  google.maps.event.addListener(panorama1, 'position_changed', function() {
    panorama2.setPosition(panorama1.getPosition());
  });

  google.maps.event.addListener(panorama1, 'pov_changed', function() {
    panorama2.setPov(panorama1.getPov());
  });

  google.maps.event.addListener(panorama1, 'zoom_changed', function() {
    panorama2.setZoom(panorama1.getZoom());
  });

  $("[data-pano]").click(function() {
    console.log($(this).attr('data-pano'));
    panorama1.setPano($(this).attr('data-pano'));
  })
}

google.maps.event.addDomListener(window, 'load', initialize);
