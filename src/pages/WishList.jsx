import React, { useState, useEffect, useRef } from 'react'
import { StayList } from '../cmps/StayList'
import { loadStays } from '../store/actions/stay.actions'
import { useSelector } from 'react-redux'
import { GoogleMap } from '../cmps/GoogleMaps'

export function WishList({}) {
    const [hoveredStayId, setHoveredStayId] = useState(null)
    const stays = useSelector((state) => state.stayModule.stays)

    useEffect(() => {
        loadStays({ wishlist: true })
    }, [])

    return (
        <div className="wishlist-container">
            <StayList stays={stays} showPrice={false} onStayHover={setHoveredStayId} />
            <GoogleMap stays={stays} wishlist={true} hoveredStayId={hoveredStayId} />
        </div>
    )
}
