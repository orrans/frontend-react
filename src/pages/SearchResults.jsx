import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GoogleMap } from '../cmps/GoogleMaps'
import { useSelector } from 'react-redux'
import { StayList } from '../cmps/StayList'
import { loadStays, setFilterBy } from '../store/actions/stay.actions'
import { add } from 'date-fns'
import { stayService } from '../services/stay'

export function SearchResults({ }) {
    const [hoveredStayId, setHoveredStayId] = useState(null)
    const [searchParams] = useSearchParams()
    const stays = useSelector((storeState) => storeState.stayModule.stays)
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
    const defaultFrom = add(new Date(), { days: 1 })
    const defaultTo = add(defaultFrom, { days: 5 })

    const checkInRaw = searchParams.get('checkIn')
    const checkOutRaw = searchParams.get('checkOut')

    const fromDate = checkInRaw ? new Date(checkInRaw) : defaultFrom
    const toDate = checkOutRaw ? new Date(checkOutRaw) : defaultTo

    useEffect(() => {
        const filterFromUrl = stayService.getFilterFromParams(searchParams)
        setFilterBy(filterFromUrl)
    }, [searchParams])

    useEffect(() => {
        loadStays(filterBy)
    }, [filterBy])

    return (
        <main className="stay-index">
            <StayList stays={stays} fromDate={fromDate} toDate={toDate} location={filterBy?.loc} onStayHover={setHoveredStayId} />
            <GoogleMap stays={stays} fromDate={fromDate} toDate={toDate} hoveredStayId={hoveredStayId} />
        </main>
    )
}
