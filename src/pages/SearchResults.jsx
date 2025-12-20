import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GoogleMap } from '../cmps/GoogleMaps'
import { useSelector } from 'react-redux'
import { StayList } from '../cmps/StayList'
import { loadStays } from '../store/actions/stay.actions'
import { add } from 'date-fns'

export function SearchResults({}) {
    const [searchParams] = useSearchParams()
    const stays = useSelector((storeState) => storeState.stayModule.stays)
    const defaultFrom = add(new Date(), { days: 1 })
    const defaultTo = add(defaultFrom, { days: 5 })

    const fromDate = searchParams.get('checkIn') || defaultFrom
    const toDate = searchParams.get('checkOut') || defaultTo

    useEffect(() => {
        const loc = searchParams.get('loc') || ''
        const checkIn = searchParams.get('checkIn') ? new Date(searchParams.get('checkIn')) : null
        const checkOut = searchParams.get('checkOut')
            ? new Date(searchParams.get('checkOut'))
            : null

        const adults = +searchParams.get('adults') || 0
        const children = +searchParams.get('children') || 0
        const infants = +searchParams.get('infants') || 0
        const pets = +searchParams.get('pets') || 0
        const guests = adults + children + infants

        const filterBy = {
            loc,
            guests,
            pets,
            checkIn,
            checkOut,
        }

        loadStays(filterBy)
    }, [searchParams])

    return (
        <main className="stay-index">
            <StayList stays={stays} fromDate={fromDate} toDate={toDate} />
            <GoogleMap stays={stays} fromDate={fromDate} toDate={toDate} />
        </main>
    )
}
