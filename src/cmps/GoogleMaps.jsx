import {
    AdvancedMarker,
    APIProvider,
    InfoWindow,
    Map,
    useAdvancedMarkerRef,
    useMap,
} from '@vis.gl/react-google-maps'
import { differenceInDays } from 'date-fns'
import { useEffect, useState } from 'react'
import { formatPrice } from '../services/util.service'
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

export function GoogleMap({ stays, fromDate, toDate }) {
    const [isOpen, setIsOpen] = useState(false)
    const [markerRef, marker] = useAdvancedMarkerRef()
    const days = differenceInDays(toDate, fromDate)

    function handleMapClick(ev) {
        ev.map.panTo(ev.detail.latLng)
        setCoords(ev.detail.latLng)
    }

    function MapHandler({ stays }) {
        const map = useMap()

        useEffect(() => {
            if (!map || !stays.length) return

            const bounds = new google.maps.LatLngBounds()
            stays.forEach((stay) => bounds.extend(stay.loc))

            map.fitBounds(bounds)

            if (stays.length === 1) {
                const listener = google.maps.event.addListener(map, 'idle', () => {
                    if (map.getZoom() > 15) map.setZoom(15)
                    google.maps.event.removeListener(listener)
                })
            }
        }, [map, stays])

        return null
    }

    const exampleMapStyles = [
        {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#7c93a3' }],
        },
        {
            featureType: 'administrative',
            elementType: 'geometry.fill',
            stylers: [{ color: '#fefefe' }, { lightness: 20 }],
        },
        {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ color: '#f5f5f5' }, { lightness: 20 }],
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{ color: '#f5f5f5' }, { lightness: 21 }],
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#dedede' }, { lightness: 21 }],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [{ color: '#ffffff' }, { lightness: 17 }],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 }],
        },
        {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{ color: '#ffffff' }, { lightness: 18 }],
        },
        {
            featureType: 'road.local',
            elementType: 'geometry',
            stylers: [{ color: '#ffffff' }, { lightness: 16 }],
        },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#f2f2f2' }, { lightness: 19 }],
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#c9e7f1' }, { lightness: 17 }],
        },
    ]

    return (
        <section className="google-map-container">
            <APIProvider apiKey={API_KEY}>
                <div className="map-wrapper">
                    <Map
                        className="map"
                        defaultZoom={12}
                        mapId="cce1a61f00cdb4a0a238fe28"
                        disableDefaultUI={true}
                        defaultOptions={{ styles: exampleMapStyles }}
                        onClick={handleMapClick}>
                        <MapHandler stays={stays} />
                        {stays.map((stay) => (
                            <AdvancedMarker
                                key={stay._id}
                                position={stay.loc}
                                ref={markerRef}
                                onClick={() => setIsOpen(!isOpen)}>
                                <div className="map-marker">{formatPrice(stay.price * days)}</div>
                            </AdvancedMarker>
                        ))}
                        {isOpen && (
                            <InfoWindow anchor={marker} onCloseClick={() => setIsOpen(false)}>
                                <h3>This marker is at {JSON.stringify(coords)}</h3>
                            </InfoWindow>
                        )}
                    </Map>
                </div>
            </APIProvider>
        </section>
    )
}
