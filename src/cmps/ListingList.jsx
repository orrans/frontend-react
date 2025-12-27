import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ListingPreview } from './ListingPreview'
import { loadStays } from '../store/actions/stay.actions'
import { PlatypusLoader } from './PlatypusLoader'

export function ListingList() {
    const [isLoading, setIsLoading] = useState(true)
    const loggedInUser = useSelector((state) => state.userModule.user)
    const listings = useSelector((state) =>
        state.stayModule.stays.filter((stay) => stay.host._id === loggedInUser?._id)
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

    if (isLoading) return <PlatypusLoader />
    if (!listings.length) return <div>No listings found</div>
    
    return (
        <div className="listing-list-container">
            <h3 className="listing-count">{listings.length} listings</h3>
            
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
        </div>
    )
}
