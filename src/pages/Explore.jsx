import React, { useState, useEffect, useRef, Fragment } from 'react'
import { StayExploreList } from '../cmps/StayExploreList'
import { useSelector } from 'react-redux'
import { groupBy } from '../services/util.service'
import { loadStays } from '../store/actions/stay.actions'

export function Explore({}) {
    const stays = useSelector((storeState) => storeState.stayModule.stays)

    useEffect(() => {
        loadStays()
    }, [])

    const groups = groupBy(stays, 'loc.country')
    console.log(stays)

    return (
        <section className="stay-explore-list-container">
            {Object.entries(groups).map(([key, value]) => {
                return <StayExploreList key={key} stays={value} title={key} />
            })}
        </section>
    )
}
