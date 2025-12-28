import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import { formatPrice } from '../services/util.service'
import { SpecialBtn } from './SpecialBtn'

export function ListingPreview({ listing }) {
    const dateFormat = 'dd/MM/yyyy'
    function handleUpdate() {}

    return (
        <tr className="listing-row">
            <td>
                <div className="listing-name">
                    <img src={listing.imgUrls[0]} /> {listing.name}
                </div>
            </td>
            <td>
                <div className="listing-row-actions">
                    <SpecialBtn txt={'Edit'} onClick={handleUpdate} />
                </div>
            </td>
            <td>{listing.capacity}</td>
            <td>{listing.bedrooms}</td>
            <td>{listing.bathrooms}</td>
            <td>{formatPrice(listing.price)}</td>
            <td>{listing.loc.city}</td>
            <td>{listing.createdAt ? format(new Date(listing.createdAt), dateFormat) : '-'}</td>
        </tr>
    )
}
