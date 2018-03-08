
if ($('#map-canvas').length){//if element exists
    function initialise() {

        var myLatlng = new google.maps.LatLng(51.180418, -1.701657); // Add the coordinates
        var mapOptions = {
            //styles: mapStyle,
            zoom: 14, // The initial zoom level when your map loads (0-20)
            minZoom: 6, // Minimum zoom level allowed (0-20)
            maxZoom: 20, // Maximum soom level allowed (0-20)
            zoomControl:true, // Set to true if using zoomControlOptions below, or false to remove all zoom controls.
            zoomControlOptions: {
                style:google.maps.ZoomControlStyle.DEFAULT // Change to SMALL to force just the + and - buttons.
            },
            center: myLatlng, // Centre the Map to our coordinates variable
            mapTypeId: google.maps.MapTypeId.ROADMAP, // Set the type of Map
            scrollwheel: false, // Disable Mouse Scroll zooming (Essential for responsive sites!)
            // All of the below are set to true by default, so simply remove if set to true:
            panControl:false, // Set to false to disable
            mapTypeControl:false, // Disable Map/Satellite switch
            scaleControl:false, // Set to false to hide scale
            streetViewControl:false, // Set to disable to hide street view
            overviewMapControl:false, // Set to false to remove overview control
            rotateControl:false // Set to false to disable rotate control
            }
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions); // Render our map within the empty div
        var image = new google.maps.MarkerImage("images/map-marker.png", null, null, null, new google.maps.Size(100,100)); // Create a variable for our marker image.
        var marker = new google.maps.Marker({ // Set the marker
            position: myLatlng, // Position marker to coordinates
            icon:image, //use our image as the marker
            map: map, // assign the market to our map variable
            title: 'Click here for more details', // Marker ALT Text
            optimized: false
        });
        var myoverlay = new google.maps.OverlayView();
        myoverlay.draw = function () {
            this.getPanes().markerLayer.id='markerLayer';
        };
        myoverlay.setMap(map);
        var infowindow = new google.maps.InfoWindow({ // Create a new InfoWindow
                content:"Cholderton Charlies Rare Breeds Farm," // HTML contents of the InfoWindow
            });
        google.maps.event.addListener(marker, 'click', function() { // Add a Click Listener to our marker
                infowindow.open(map,marker); // Open our InfoWindow
            });
        google.maps.event.addDomListener(window, 'resize', function() { map.setCenter(myLatlng); }); // Keeps the Pin Central when resizing the browser on responsive sites
    }
    google.maps.event.addDomListener(window, 'load', initialise); // Execute our 'initialise' function once the page has loaded.
}