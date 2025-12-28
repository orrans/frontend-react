import React, { useState } from 'react'
import { format } from 'date-fns'
import { formatPrice } from '../services/util.service'
import { SpecialBtn } from './SpecialBtn.jsx'

export function ListingPreviewCard({ listing }) {
    const dateFormat = 'dd/MM/yyyy'
    const [isOpen, setIsOpen] = useState(false)

    function handleUpdate(ev) {
        ev.stopPropagation()
        // Add edit functionality here
    }

    return (
        <div className="listing-card" onClick={() => setIsOpen((prev) => !prev)}>
            <div className="card-listing-header">
                <img src={listing.imgUrls[0]} alt={listing.name} />
                <div className="listing-title-data">
                    <span className="listing-name">{listing.name}</span>
                    <span className="listing-location">{listing.loc.city}</span>
                </div>
            </div>
            <div className="card-data">
                <b>Price:</b>
                {formatPrice(listing.price)}
            </div>
            {isOpen && (
                <div>
                    <div className="card-data">
                        <b>Capacity:</b>
                        {listing.capacity} guests
                    </div>
                    <div className="card-data">
                        <b>Bedrooms:</b>
                        {listing.bedrooms}
                    </div>
                    <div className="card-data">
                        <b>Bathrooms:</b>
                        {listing.bathrooms}
                    </div>
                    <div className="card-data">
                        <b>Date added:</b>
                        {listing.createdAt ? format(new Date(listing.createdAt), dateFormat) : '-'}
                    </div>
                    <div>
                        <div className="listing-card-actions">
                            <SpecialBtn txt={'Edit'} onClick={handleUpdate} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
