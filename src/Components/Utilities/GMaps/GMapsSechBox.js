/* global google */

import React from 'react';

import { initGMaps } from '../../../Actions/actionsCreator';
import KeyValue from '../KeyValue';
import GMaps from './GMaps';

import { connect } from "react-redux";

import $ from 'jquery-lite'

var currentPlace = null;

// map.addListener('bounds_changed', function () {
//     searchBox.setBounds(map.getBounds());
// });

const addListenerToMap = (props, searchBox) => {
    searchBox.setBounds(props.gMapsElements.map.getBounds());
};

const addListener = (props, searchBox) => {
    // searchBox.addListener('places_changed', function (currentPlaceState) {
    var places = searchBox.getPlaces();
    var markers = [];

    if (places.length == 0) {
        return;
    }

    // Clear out the old props.markers.
    props.gMapsElements.markers.forEach(function (marker) {
        marker.setMap(null);
    });
    // props.gMapsElements.props.gMapsElements.markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
        if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
        }
        var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.

        props.gMapsElements.markers.push(new google.maps.Marker({
            map: props.gMapsElements.map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
        }));

        currentPlace = {};
        // console.log(place.address_components);
        place.address_components.map((place, index) => {
            var types = place.types[0];

            switch (types) {
                case 'street_number':
                    currentPlace.streetNumber = {
                        key: 'Número: ',
                        value: place.long_name
                    }
                    // currentPlace.streetNumber = place.long_name;
                    break;
                case 'route':
                    currentPlace.route = {
                        key: 'Dirección: ',
                        value: place.long_name
                    }
                    // currentPlace.route = place.long_name;
                    break;
                case 'sublocality_level_1':
                    currentPlace.sublocality = {
                        key: 'Zona: ',
                        value: place.long_name
                    }
                    // currentPlace.sublocality = place.long_name;
                    break;
                case 'locality':
                    currentPlace.locality = {
                        key: 'Localidad: ',
                        value: place.short_name
                    }
                    // currentPlace.locality = place.short_name;
                    break;
                case 'administrative_area_level_1':
                    currentPlace.province = {
                        key: 'Provincia: ',
                        value: place.short_name
                    }
                    // currentPlace.province = place.long_name;
                    break;
                case 'country':
                    currentPlace.country = {
                        key: 'País: ',
                        value: place.long_name
                    }
                    // currentPlace.country = place.long_name;
                    break;
                case 'postal_code':
                    currentPlace.postalCode = {
                        key: 'Código Postal: ',
                        value: place.long_name
                    }
                    // currentPlace.postalCode = place.long_name;
                    break;

                default:
                    return currentPlace
            }
        });

        if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }
    });
    var map = props.gMapsElements.map;
    map.fitBounds(bounds);

    var gMapsElements = {
        currentPlace,
        markers: props.gMapsElements.markers,
        map
    }
    // gMapsElements gMapsElements.markers

    props.initGMaps(gMapsElements);

};



class GMapsSechBox extends React.Component {


    componentDidMount() {

        // var mapElement = document.getElementById('map');
        var input = document.getElementById('pac-input');
        // var markers = [];

        // var map = initAutocomplete(mapElement);

        // var infoWindow = new google.maps.InfoWindow({ map: map });
        var searchBox = new google.maps.places.SearchBox(input);

        // setCurrentPosition(map, markers, infoWindow);
        searchBox.addListener('places_changed', addListener.bind(null, this.props, searchBox));
        this.props.gMapsElements.map.addListener('bounds_changed', addListenerToMap.bind(null, this.props, searchBox));
        // map.addListener('bounds_changed', function () {

        // var place = currentPlace.map((object, index) =>
        //     <p key={index}> {JSON.stringify(object)} </p>
        // )
    }

    render() {

        // var a = this.props;

        return (
            <div>

                <KeyValue dataKeyValue={this.props.gMapsElements.currentPlace} />

                <div>
                    <div className="input-text-container">
                        <input id="pac-input" className="inputMaterial" type="text" required placeholder=" " />
                        <label>Search Box</label>
                        <hr />
                    </div>
                </div>
            </div>
        );
    }
}

/*
const GMapsSechBox = (props) => {

                    props.componentDidMount();

                return (
        <div>
                    <input id="pac-input" type="text" placeholder="Search Box" />
                    <div id="map"></div>
                </div>
                );


}*/



const mapStateToProps = state => {
    return {
        gMapsElements: state.maps.gMapsElements
    };
}


const mapDispatchToProps = dispatch => {
    return {
        initGMaps(place) {
            dispatch(initGMaps(place));
        }
    };
}

// initGMaps(gMapsElements) {
//             dispatch(initGMaps(gMapsElements));
//         }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GMapsSechBox);

// export default GMapsSechBox;

