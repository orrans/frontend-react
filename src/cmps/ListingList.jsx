import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { ListingPreview } from './ListingPreview'
import { loadStays } from '../store/actions/stay.actions'

export function ListingList({}) {
    const loggedInUser = useSelector((state) => state.userModule.user)
    const listings = useSelector(
        (state) =>
            state.stayModule.stays.filter((stay) => true || stay.host._id === loggedInUser?._id) // TODO: remove true to enable filtering after testing
    )

    useEffect(() => {
        loadStays()
    }, [])

    if (!listings.length) return 'loading...'
    return (
        <div className="listings-table">
            <table>
                <thead>
                    <tr>
                        <th>Listing</th>
                        <th>Action</th>
                        <th>Capacity</th>
                        <th>Bedrooms</th>
                        <th>Bathrooms</th>
                        <th>Price</th>
                        <th>Location</th>
                        <th>Date added</th>
                    </tr>
                </thead>
                <tbody>
                    {listings.map((listing) => (
                        <ListingPreview key={listing._id} listing={listing} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
