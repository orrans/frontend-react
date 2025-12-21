import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, addStay } from '../store/actions/stay.actions'
import { stayService } from '../services/stay'
import { StayExploreList } from '../cmps/StayExploreList.jsx'
import { StayList } from '../cmps/StayList.jsx'
import { GoogleMap } from '../cmps/GoogleMaps.jsx'
import { useParams, useSearchParams } from 'react-router-dom'
import { groupBy } from '../services/util.service.js'

export function StayIndex() {
    const stays = useSelector((storeState) => storeState.stayModule.stays)

    useEffect(() => {
        loadStays()
    }, [])

    const groups = groupBy(stays, 'loc.country')

    if (!stays) return <div>Loading...</div>

    return (
        <main className="stay-index">
            <section className="stay-explore-list-container">
                {Object.entries(groups).map(([key, value]) => {
                    return <StayExploreList key={key} stays={value} title={key} />
                })}
            </section>
        </main>
    )
}
