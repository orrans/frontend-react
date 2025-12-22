import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays } from '../store/actions/stay.actions'
import { StayExploreList } from '../cmps/StayExploreList.jsx'
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
