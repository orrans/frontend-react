import { AdvancedMarker, APIProvider, InfoWindow, Map, useMap } from '@vis.gl/react-google-maps'
import { differenceInDays } from 'date-fns'
import { useEffect, useState } from 'react'
import { formatPrice } from '../services/util.service'
import { StayPreview } from './StayPreview'
import { ClearIcon } from './icons/ClearIcon.jsx'
import { HouseIcon } from './icons/HouseIcon.jsx'
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

export function GoogleMap({ stays, fromDate = new Date(), toDate = new Date(), wishlist = false, hoveredStayId = null, zoom }) {
    const [selectedStay, setSelectedStay] = useState(null)
    const days = differenceInDays(toDate, fromDate)
    
    const defaultZoom = zoom ?? (stays.length === 1 ? 13 : 12)

    function MapHandler({ stays, selectedStay }) {
        const map = useMap()

        useEffect(() => {
            if (!map || !stays.length || selectedStay) return
            
            if (stays.length === 1) {
                const stayLocation = fixLoc(stays[0].loc)
                map.setCenter(stayLocation)
                map.setZoom(13)
            }
            else if (stays.length > 1) {
                const bounds = new google.maps.LatLngBounds()
                stays.forEach((stay) => bounds.extend(fixLoc(stay.loc)))
                map.fitBounds(bounds)
            }
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
    
    const mapCenter = stays.length > 0 ? fixLoc(stays[0].loc) : { lat: 32.0853, lng: 34.7818 }

    return (
        <section className="google-map-container">
            <APIProvider apiKey={API_KEY}>
                <div className="map-wrapper">
                    <Map
                        className="map"
                        defaultZoom={defaultZoom}
                        defaultCenter={mapCenter}
                        mapId="cce1a61f00cdb4a0a238fe28"
                        disableDefaultUI={true}>
                        <MapHandler stays={stays} selectedStay={selectedStay} />
                        {stays.map((stay) => {
                            const isHighlighted = selectedStay?._id === stay._id || hoveredStayId === stay._id
                            return (
                                <AdvancedMarker
                                    key={stay._id}
                                    position={fixLoc(stay.loc)}
                                    onClick={() => setSelectedStay(stay)}
                                    zIndex={isHighlighted ? 5 : 0}>
                                    <div
                                        className={`map-marker ${isHighlighted ? 'selected-marker' : ''}`}>
                                        {wishlist ? <HouseIcon className={'house-marker'}/> : formatPrice(stay.price * days)}
                                    </div>
                                </AdvancedMarker>
                            )
                        })}
                        {selectedStay && (
                            <AdvancedMarker position={fixLoc(selectedStay.loc)}>
                                <div className="map-stay-preview">
                                    <button
                                        className="close-marker"
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            event.preventDefault()
                                        }}>
                                        <ClearIcon onClick={() => setSelectedStay(null)} size={16} strokeWidth={3} />
                                    </button>
                                    <StayPreview
                                        stay={selectedStay}
                                        fromDate={fromDate}
                                        toDate={toDate}
                                        variant="explore"
                                        showPrice={!wishlist}
                                        isMapPreview={true}
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
