$(function() {

    var locations = [
        ['Salisbury City Guides', 51.068997, -1.794550],
        ['Stonehenge<br> Amesbury, Salisbury SP4 7DE, UK', 51.178905, -1.826209],
        ['New Forest National Park', 50.876522, -1.631430],
        ['Jurassic Coast - Cliff', 50.707545, -2.755250],
        ['Wilton', 51.079007, -1.862581],
        ['Old Sarum', 51.093220, -1.804862]
    ];

    var map = new google.maps.Map($('.map-canvas')[0], {
        zoom: 10,
        center: new google.maps.LatLng(51.068997, -1.794550)
    });

    // Add a custom marker
    var markerIcon = {
        url: 'images/map-marker.png',
        scaledSize: new google.maps.Size(50, 50)
    };

    $.each(locations, function(i, e) {
        var marker = new google.maps.Marker({
            map: map,
            icon: markerIcon,
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        });
        var info = new SnazzyInfoWindow({
            marker: marker,
            content: locations[i][0]
        });
        //info.open();
    });
});