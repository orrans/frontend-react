import React, { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { ListingPreview } from './ListingPreview'
import { loadStays } from '../store/actions/stay.actions'
import { PlatypusLoader } from './PlatypusLoader'
import { useIsMobile } from '../customHooks/useIsMobile'
import { ListingPreviewCard } from './ListingPreviewCard'

export function ListingList() {
    const [isLoading, setIsLoading] = useState(true)
    const loggedInUser = useSelector((state) => state.userModule.user)
    const allStays = useSelector((state) => state.stayModule.stays)
    const listings = useMemo(
        () => allStays.filter((stay) => stay.host._id === loggedInUser?._id),
        [allStays, loggedInUser?._id]
    )
    const isMobile = useIsMobile()

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

    if (isMobile) {
        return (
            <div className="listing-list-container">
                <h3 className="listing-count-card">{listings.length} listings</h3>
                {listings.map((listing) => (
                    <ListingPreviewCard key={listing._id} listing={listing} />
                ))}
            </div>
        )
    }

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
