import { AdvancedMarker, APIProvider, InfoWindow, Map, useMap } from '@vis.gl/react-google-maps'
import { differenceInDays } from 'date-fns'
import { useEffect, useState } from 'react'
import { formatPrice } from '../services/util.service'
import { StayPreview } from './StayPreview'
import { ClearIcon } from './icons/ClearIcon.jsx'
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

export function GoogleMap({ stays, fromDate, toDate }) {
    const [selectedStay, setSelectedStay] = useState(null)
    const days = differenceInDays(toDate, fromDate)

    function MapHandler({ stays, selectedStay }) {
        const map = useMap()

        useEffect(() => {
            if (!map || !stays.length || selectedStay) return

            const bounds = new google.maps.LatLngBounds()
            stays.forEach((stay) => bounds.extend(fixLoc(stay.loc)))
            map.fitBounds(bounds)

        }, [map, stays]) 

        useEffect(() => {
            if (selectedStay && map) {
                const stayLocation = fixLoc(selectedStay.loc)

                map.panTo(stayLocation)
                map.panBy(0, -150)
            }
        }, [selectedStay, map])

        return null
    }

    return (
        <section className="google-map-container">
            <APIProvider apiKey={API_KEY}>
                <div className="map-wrapper">
                    <Map
                        className="map"
                        defaultZoom={12}
                        defaultCenter={{ lat: 32.0853, lng: 34.7818 }}
                        mapId="cce1a61f00cdb4a0a238fe28"
                        disableDefaultUI={true}>
                        <MapHandler stays={stays} selectedStay={selectedStay} />
                        {stays.map((stay) => (
                            <AdvancedMarker
                                key={stay._id}
                                position={fixLoc(stay.loc)}
                                onClick={() => setSelectedStay(stay)}>
                                <div
                                    className={`map-marker ${
                                        selectedStay?._id === stay._id ? 'selected-marker' : ''
                                    }`}>
                                    {formatPrice(stay.price * days)}
                                </div>
                            </AdvancedMarker>
                        ))}
                        {selectedStay && (
                            <AdvancedMarker position={fixLoc(selectedStay.loc)}>
                                <div className="map-stay-preview">
                                    <button className="close-marker">
                                        <ClearIcon onClick={() => setSelectedStay(null)} />
                                    </button>
                                    <StayPreview
                                        stay={selectedStay}
                                        fromDate={fromDate}
                                        toDate={toDate}
                                        variant="explore"
                                    />
                                </div>
                            </AdvancedMarker>
                        )}
                    </Map>
                </div>
            </APIProvider>
        </section>
    )
}

function fixLoc(loc) {
    return { lng: loc.lat, lat: loc.lng }
}
