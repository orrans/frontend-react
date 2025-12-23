import { Map, AdvancedMarker } from '@vis.gl/react-google-maps'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

export function StayLocationMap({ stay }) {
  
  if (!API_KEY) {
    return <div className="map-placeholder" />
  }

  return (
    <Map
      defaultZoom={14}
      center={{ lat: stay.loc.lat, lng: stay.loc.lng }}
      disableDefaultUI
      mapId="DEMO_MAP_ID"
      style={{ width: '100%', height: '100%' }}
    >
      <AdvancedMarker position={{ lat: stay.loc.lat, lng: stay.loc.lng }} />
    </Map>
  )
}
