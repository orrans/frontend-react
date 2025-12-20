import {
    AdvancedMarker,
    APIProvider,
    InfoWindow,
    Map,
    useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps'
import { useState } from 'react'
const API_KEY = 'AIzaSyA5YAKbctMWmj2etXv-KY7MSXDMGaWr0qs'

export function GoogleMap() {
    const [coords, setCoords] = useState({ lat: 32.0853, lng: 34.7818 })
    const [isOpen, setIsOpen] = useState(false)
    const [markerRef, marker] = useAdvancedMarkerRef()

    function handleMapClick(ev) {
        // console.log('ev:', ev)
        ev.map.panTo(ev.detail.latLng)
        setCoords(ev.detail.latLng)
    }
    return (
        <section className="google-map-container">
            <APIProvider apiKey={API_KEY}>
                <div className="map-wrapper">
                    <Map
                        className="map"
                        defaultCenter={coords}
                        defaultZoom={12}
                        mapId="DEMO_MAP_ID"
                        disableDefaultUI={true}
                        onClick={handleMapClick}>
                        <AdvancedMarker
                            position={coords}
                            ref={markerRef}
                            onClick={() => setIsOpen(!isOpen)}>
                            <div style={{ fontSize: '3em' }}>❤️</div>
                        </AdvancedMarker>
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
