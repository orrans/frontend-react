import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { clearStays, loadStays, setFilterBy } from '../store/actions/stay.actions'
import { stayService } from '../services/stay'
import { StayExploreList } from '../cmps/StayExploreList.jsx'
import { groupBy } from '../services/util.service.js'
import { loadOrders } from '../store/actions/order.actions.js'
import { PlatypusLoader } from '../cmps/PlatypusLoader.jsx'
import { userService } from '../services/user'

export function StayIndex() {
    const stays = useSelector((storeState) => storeState.stayModule.stays)

    useEffect(() => {
        const emptyFilter = stayService.getDefaultFilter()
        setFilterBy(emptyFilter)
        clearStays()
        loadStays()
        if (userService.getLoggedinUser()) {
            loadOrders()
        }
    }, [])

    const groups = groupBy(stays, 'loc.country')

    if (!stays) return <PlatypusLoader />

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
