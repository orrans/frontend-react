import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { ListingPreview } from './ListingPreview'
import { loadStays } from '../store/actions/stay.actions'
import { PlatypusLoader } from './PlatypusLoader'

export function ListingList({}) {
    const [isLoading, setIsLoading] = useState(true)
    const loggedInUser = useSelector((state) => state.userModule.user)
    const listings = useSelector(
        (state) =>
            state.stayModule.stays.filter((stay) => true || stay.host._id === loggedInUser?._id) // TODO: remove true to enable filtering after testing
    )

    useEffect(() => {
        const loadData = async () => {
            await loadStays()
            setIsLoading(false)
        }
        loadData()
    }, [])

    useEffect(() => {
        if (listings.length > 0 && isLoading) {
            setIsLoading(false)
        }
    }, [listings.length])

    if (isLoading) return <PlatypusLoader/>
    return (
        <div className="listing-table">
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
