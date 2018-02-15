
if ($('#map-canvas').length){//if element exists
    function initialise() {
        // Snazzy Map Style - https://snazzymaps.com/style/6618/cladme
        var mapStyle = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];



        var myLatlng = new google.maps.LatLng(51.002745, -2.134121); // Add the coordinates
        var mapOptions = {
            styles: mapStyle,
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
        var image = new google.maps.MarkerImage("images/map-marker.png", null, null, null, new google.maps.Size(97,97)); // Create a variable for our marker image.
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
                content:"The Grove Arms, Ludwell, Shaftesbury, Dorset, SP7 9ND" // HTML contents of the InfoWindow
            });
        google.maps.event.addListener(marker, 'click', function() { // Add a Click Listener to our marker
                infowindow.open(map,marker); // Open our InfoWindow
            });
        google.maps.event.addDomListener(window, 'resize', function() { map.setCenter(myLatlng); }); // Keeps the Pin Central when resizing the browser on responsive sites
    }
    google.maps.event.addDomListener(window, 'load', initialise); // Execute our 'initialise' function once the page has loaded.
}