

$(function(){
    //map in tablet and desktop only
    if($('#mapArea').length && getViewportWidth() > 700){
        drowMap();
    }else{
        $('#mapArea').hide();
    }

    $(window).on('resize', function() {
        drowMap();
    });
});

var map;
function drowMap(){
    $('#mapArea').empty();//empty maparea before drow/redraw
    map = new Datamap({
        element: document.getElementById('mapArea'),
        scope: 'world',
        projection: 'mercator',
        geographyConfig: {
            borderColor: '#00aeef',
            borderWidth: .7,
            highlightFillColor: function(data){
                if (data.fillKey) {
                    return '#a5dff9';
                }
                return 'transparent';
            },
            highlightBorderColor: '#00aeef',
            highlightBorderWidth: .7,
            // popupOnHover: function(data){
            //     if (data.fillKey) {
            //         return true;
            //     }
            //     return false;
            // }
        },
        fills: {
            'marker': '#f5851f',
            'country': '#e7f6fd',
            defaultFill: "transparent",
        },
        data: {
            'GBR': { fillKey: 'country' },//United Kingdom
            'PRT': { fillKey: 'country' },//Portugal
            'ESP': { fillKey: 'country' },//Spain
            'FRA': { fillKey: 'country' },//France
            'DEU': { fillKey: 'country' },//Germany
            'CHE': { fillKey: 'country' },//Switzerland
            'ITA': { fillKey: 'country' },//Italy
            'AUT': { fillKey: 'country' },//Austria
            'CZE': { fillKey: 'country' },//Czech Republic
            'POL': { fillKey: 'country' },//Poland
            'SVN': { fillKey: 'country' },//Slovenia
            'HRV': { fillKey: 'country' },//Croatia
            'HUN': { fillKey: 'country' },//Hungary
            'SVK': { fillKey: 'country' },//Slovakia
            'BEL': { fillKey: 'country' },//Belgium
            'BGR': { fillKey: 'country' },//Bulgaria
            'CYP': { fillKey: 'country' },//Cyprus
            'DNK': { fillKey: 'country' },//DENMARK
            'EST': { fillKey: 'country' },//Estonia
            'FIN': { fillKey: 'country' },//Finland
            'GRC': { fillKey: 'country' },//Greece
            'IRL': { fillKey: 'country' },//Ireland
            'LVA': { fillKey: 'country' },//Latvia
            'LTU': { fillKey: 'country' },//Lithuania
            'MLT': { fillKey: 'country' },//Malta
            'NLD': { fillKey: 'country' },//Netherlands
            'ROU': { fillKey: 'country' },//Romania
            'SWE': { fillKey: 'country' },//Sweden
        },
        
        setProjection: function (element) {
            var projection = d3.geo.mercator()
                .center([4, 53]) // always in [East Latitude, North Longitude]
                .scale( (getViewportWidth() < 900 ? element.offsetWidth : element.offsetHeight) )
                // .scale(3000)
                .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
            var path = d3.geo.path().projection(projection);
    
            return { path: path, projection: projection };
        },
        done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
               countryClicked($(this), geography.id);
            });
        }
    });

    // Add pins on selected countries
    map.addPlugin('pins', function(layer, data, options) {

        var self = this,
            fillData = this.options.fills,
            svg = this.svg;

        if (!data || (data && !data.slice)) {
            throw "Datamaps Error - bubbles must be an array";
        }

        var bubbles = layer.selectAll('image.datamaps-pins').data(data, JSON.stringify);

        var markerH = 22;
        var markerW = 15;

        bubbles.enter()
            .append('image')
            .attr('class', 'datamaps-pin')
            .attr('data-id', function(datum){
                return datum.c_id;
            })
            .attr('xlink:href', 'images/mapmarker.png')
            .attr('height', markerH)
            .attr('width', markerW)
            .attr('x', function(datum) {
                var latLng = [];
                var coord;
                if (datumHasCoords(datum)) {
                    // latLng = self.latLngToXY(datum.latitude, datum.longitude);
                    coord = self.latLngToXY(datum.latitude, datum.longitude);
                    latLng = coord;

                } else if (datum.centered) {
                    // latLng = self.path.centroid(svg.select('path.' + datum.centered).data()[0]);
                    coord = self.path.centroid(svg.select('path.' + datum.centered).data()[0]);
                    latLng = coord;
                }
                if (latLng) return latLng[0];
            })
            .attr('y', function(datum) {
                var latLng = [];
                var coord;
                if (datumHasCoords(datum)) {
                    // latLng = self.latLngToXY(datum.latitude, datum.longitude);
                    coord = self.latLngToXY(datum.latitude, datum.longitude);
                    latLng = coord;

                } else if (datum.centered) {
                    // latLng = self.path.centroid(svg.select('path.' + datum.centered).data()[0]);
                    coord = self.path.centroid(svg.select('path.' + datum.centered).data()[0]);
                    latLng = coord;
                }
                if (latLng) return latLng[1];
            });

        bubbles.exit()
            .transition()
            .delay(options.exitDelay)
            .attr("height", 0)
            .remove();

        function datumHasCoords(datum) {
            return typeof datum !== 'undefined' && typeof datum.latitude !== 'undefined' && typeof datum.longitude !== 'undefined';
        }

    });

    //Pins positions 
    map.pins([
        {
            name: "United Kingdom",
            c_id: 'GBR',
            centered: 'GBR',
            // latitude: 51.5074,
            // longitude: 0.1278,
            fillKey: 'marker'
        },{
            name: "Portugal",
            c_id: 'PRT',
            centered: 'PRT',
            // latitude: 38.722,
            // longitude: -9.1393,
            fillKey: 'marker'
        }
        ,{
            name: "Spain",
            c_id: 'ESP',
            centered: 'ESP',
            fillKey: 'marker'
        }
        ,{
            name: "France",
            c_id: 'FRA',
            centered: 'FRA',
            fillKey: 'marker'
        }
        ,{
            name: "Germany",
            c_id: 'DEU',
            centered: 'DEU',
            fillKey: 'marker'
        }
        ,{
            name: "Switzerland",
            c_id: 'CHE',
            centered: 'CHE',
            // latitude: 46.9480,
            // longitude: 7.4474,
            fillKey: 'marker'
        }
        ,{
            name: "Italy",
            c_id: 'ITA',
            centered: 'ITA',
            fillKey: 'marker'
        }
        ,{
            name: "Austria",
            c_id: 'AUT',
            centered: 'AUT',
            fillKey: 'marker'
        }
        ,{
            name: "Czech Republic",
            c_id: 'CZE',
            centered: 'CZE',
            fillKey: 'marker'
        }
        ,{
            name: "Poland",
            c_id: 'POL',
            centered: 'POL',
            fillKey: 'marker'
        }
        ,{
            name: "Slovenia",
            c_id: 'SVN',
            centered: 'SVN',
            // latitude:45.9203027,
            // longitude:14.2651287,
            fillKey: 'marker'
        }
        ,{
            name: "Croatia",
            c_id: 'HRV',
            // centered: 'HRV',
            latitude: 45.813508,
            longitude: 15.979617,
            fillKey: 'marker'
        }
        ,{
            name: "Hungary",
            c_id: 'HUN',
            centered: 'HUN',
            fillKey: 'marker'
        }
        ,{
            name: "Slovakia",
            c_id: 'SVK',
            centered: 'SVK',
            fillKey: 'marker'
        },
        {
            name: "Belgium",
            c_id: 'BEL',
            centered: 'BEL',
            fillKey: 'marker'
        },
        {
            name: "Bulgaria",
            c_id: 'BGR',
            centered: 'BGR',
            fillKey: 'marker'
        },
        {
            name: "Cyprus",
            c_id: 'CYP',
            centered: 'CYP',
            fillKey: 'marker'
        },
        {
            name: "Denmark",
            c_id: 'DNK',
            centered: 'DNK',
            fillKey: 'marker'
        },
        {
            name: "Estonia",
            c_id: 'EST',
            centered: 'EST',
            fillKey: 'marker'
        },
        {
            name: "Finland",
            c_id: 'FIN',
            centered: 'FIN',
            fillKey: 'marker'
        },
        {
            name: "Greece",
            c_id: 'GRC',
            centered: 'GRC',
            fillKey: 'marker'
        },
        {
            name: "Ireland",
            c_id: 'IRL',
            centered: 'IRL',
            fillKey: 'marker'
        },
        {
            name: "Latvia",
            c_id: 'LVA',
            centered: 'LVA',
            fillKey: 'marker'
        },
        {
            name: "Lithuania",
            c_id: 'LTU',
            centered: 'LTU',
            fillKey: 'marker'
        },
        {
            name: "Malta",
            c_id: 'MLT',
            centered: 'MLT',
            fillKey: 'marker'
        },
        {
            name: "Netherlands",
            c_id: 'NLD',
            centered: 'NLD',
            fillKey: 'marker'
        },
        {
            name: "Romania",
            c_id: 'ROU',
            centered: 'ROU',
            fillKey: 'marker'
        },
        {
            name: "Sweden",
            c_id: 'SWE',
            centered: 'SWE',
            fillKey: 'marker'
        },
    ]);

    pinEvent();
}

// Add click event on pins
function pinEvent(){
    $('.datamaps-pin').on('click', function(){
        pin_id = $(this).attr('data-id');
        pin_obj = $('.datamaps-subunit '+pin_id);
        countryClicked(pin_obj, pin_id);
    });
}

/* when Country clicked*/
function countryClicked(obj, c_id){
    $('.datamaps-subunit.selected').css({
        'fill' : 'rgb(231, 246, 253)',
        'stroke': 'rgb(0, 174, 239)'
    }).removeClass('selected');
    obj.addClass('selected');
    getInfo(c_id);
    addFlagMarker(c_id);
}

/* Add flag marker on click of country */
function addFlagMarker(c_id){

    var pin = $('.pins').find('.datamaps-pin[data-id="'+c_id+'"]');
    var posX = pin.attr('x')+'px';
    var posY = pin.attr('y')+'px';

    pin.css({
        'opacity': 0
    })
    .siblings()
    .css({
        'opacity': 1
    });

    if($('#mapArea').find('.flagMarker').length){
        $('#mapArea').find('.flagMarker').remove();
        addDiv();
    }else{
        addDiv();
    }

    function addDiv(){

        var flg = '<div class="flagMarker-inner bg-color-primary">'+
                    '<div class="edge"></div>'+
                    '<div class="">'+
                        '<div class="edge"></div>'+
                        '<div class="flag-name"></div>'+
                    '</div>'+
                '</div>';

        jQuery('<div/>', {
            class: c_id,
        })
        .addClass('flagMarker')
        .addClass('active')
        .css({
            'left' : posX,
            'top' : posY
        })
        .append(flg)
        .appendTo('#mapArea');
    }
}