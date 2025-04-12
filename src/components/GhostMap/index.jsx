
/*global google*/
import React, { useState } from 'react';
import { useJsApiLoader, GoogleMap, MarkerF } from '@react-google-maps/api';
import GhostMarker from './ghostmarker.png'
import './ghostmap.css';



const containerStyle = {
    width: '100%',
    height: '500px'
};
const center = {
    lat: 50.8247614,
    lng: -0.1441344,
}

export const GhostMap = ({ ghosts, onGhostSelect }) => {
    const [map, setMap] = useState(null)
    const [zoom, setZoom] = useState(15)

    const onLoad = React.useCallback(function callback(map) {
        setZoom(zoom)
        setMap(map)
    }, [])

    setTimeout(() => {
        const googleDefaultButtons = document.querySelectorAll(
            'button'
        );

        googleDefaultButtons.forEach((button) => {
            button.classList.add('ghost-button');
        })
    }, 500)

    const onUnmount = React.useCallback(function callback(map) {
        setMap(map)
    }, [])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GHOSTMAP_GOOGLE_MAPS_API_KEY,
    })

    return isLoaded ? (
        <div className="ghost-map-container">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    styles: [
                        {
                            featureType: 'poi',
                            stylers: [{ visibility: 'off' }]
                        },
                        {
                            elementType: 'geometry',
                            stylers: [{ color: '#242f3e' }]
                        },
                        {
                            elementType: 'labels.text.stroke',
                            stylers: [{ color: '#242f3e' }]
                        },
                        {
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#746855' }]
                        },
                        {
                            featureType: 'administrative.locality',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#d59563' }]
                        },
                        {
                            featureType: 'poi',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#d59563' }]
                        },
                        {
                            featureType: 'poi.park',
                            elementType: 'geometry',
                            stylers: [{ color: '#263c3f' }]
                        },
                        {
                            featureType: 'poi.park',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#6b9a76' }]
                        },
                        {
                            featureType: 'road',
                            elementType: 'geometry',
                            stylers: [{ color: '#38414e' }]
                        },
                        {
                            featureType: 'road',
                            elementType: 'geometry.stroke',
                            stylers: [{ color: '#212a37' }]
                        },
                        {
                            featureType: 'road',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#9ca5b3' }]
                        },
                        {
                            featureType: 'road.highway',
                            elementType: 'geometry',
                            stylers: [{ color: '#746855' }]
                        },
                        {
                            featureType: 'road.highway',
                            elementType: 'geometry.stroke',
                            stylers: [{ color: '#1f2835' }]
                        },
                        {
                            featureType: 'road.highway',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#f3d19c' }]
                        },
                        {
                            featureType: 'transit',
                            elementType: 'geometry',
                            stylers: [{ color: '#2f3948' }]
                        },
                        {
                            featureType: 'transit.station',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#d59563' }]
                        },
                        {
                            featureType: 'water',
                            elementType: 'geometry',
                            stylers: [{ color: '#17263c' }]
                        },
                        {
                            featureType: 'water',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#515c6d' }]
                        },
                        {
                            featureType: 'water',
                            elementType: 'labels.text.stroke',
                            stylers: [{ color: '#17263c' }]
                        }
                    ]
                }}

            >
                {
                    ghosts.map(({ latitude, longitude, name, subtitle, story }) => {
                        if (!latitude || !longitude) return null;
                        return (<MarkerF
                            key={`${latitude}-${longitude}`}
                            position={{
                                lat: latitude,
                                lng: longitude,
                            }}
                            onLoad={onLoad}
                            icon={{ url: GhostMarker, scaledSize: new google.maps.Size(50, 50) }}
                            onClick={() => onGhostSelect({ name, subtitle, story })}
                        />)
                    })
                }
            </GoogleMap >
        </div>
    ) : null;
}

export default GhostMap;