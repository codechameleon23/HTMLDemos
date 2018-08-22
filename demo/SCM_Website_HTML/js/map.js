function getViewportWidth(){if (window.innerWidth){return window.innerWidth;}else if (document.body && document.body.offsetWidth){return document.body.offsetWidth;}else{return 0;}}

$(function() {

    if($('#map-canvas').length){//if element exists

        //create empty LatLngBounds object
        var bounds = new google.maps.LatLngBounds();

        var locations = [
            ['Salisbury Christmas Market', 51.069419, -1.794528],
            ['Market Walk', 51.069706, -1.797658],
        ];

        var map = new google.maps.Map($('.map-canvas')[0], {
            zoom: getViewportWidth() < 767 ? 16 : 17,
            center: new google.maps.LatLng(51.069419, -1.794528)
        });

        // Add a custom marker
        var markerIcon = {
            url: 'images/map-marker.png',
            scaledSize: getViewportWidth() < 767 ? new google.maps.Size(50, 50) : new google.maps.Size(100, 100)
        };

        $.each(locations, function(i, e) {


            var marker = new google.maps.Marker({
                map: map,
                icon: markerIcon,
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            });

            //extend the bounds to include each marker's position
            bounds.extend(marker.position);

            var info = new SnazzyInfoWindow({
                marker: marker,
                content: locations[i][0]
            });
            //info.open();
        });

        //now fit the map to the newly inclusive bounds
        map.fitBounds(bounds);

        //(optional) restore the zoom level after the map is done scaling
        var listener = google.maps.event.addListener(map, "idle", function () {
            map.setZoom(getViewportWidth() < 767 ? 16 : 17);
            
            google.maps.event.removeListener(listener);
        });

    }

});