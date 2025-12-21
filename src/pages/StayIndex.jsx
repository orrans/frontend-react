import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, addStay } from '../store/actions/stay.actions'
import { stayService } from '../services/stay'
import { StayExploreList } from '../cmps/StayExploreList.jsx'
import { StayList } from '../cmps/StayList.jsx'
import { GoogleMap } from '../cmps/GoogleMaps.jsx'
import { useParams, useSearchParams } from 'react-router-dom'
import { Explore } from './Explore.jsx'

export function StayIndex() {
    const stays = useSelector((storeState) => storeState.stayModule.stays)

    useEffect(() => {
        loadStays()
    }, [])

    if (!stays) return <div>Loading...</div>

    return (
        <main className="stay-index">
            {/* <Explore /> */}

            {/* <StayExploreList stays={stays} title="Nearby Hotel" /> */}
            {/* <StayList stays={stays} /> */}
        </main>
    )
}
