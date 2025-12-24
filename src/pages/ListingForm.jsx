import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { loadStay } from '../store/actions/stay.actions'
import { getEmptyStay } from '../services/stay'

export function ListingForm() {
    const { stayId } = useParams()

    const [stay, setStay] = useState(null)

    useEffect(() => {
        if (stayId) loadStay(stayId).then((stay) => setStay(stay))
        else setStay(getEmptyStay())
    }, [])

    if(!stay) return 'loading...'
    return (
        <div>
            <label>
                Name
                <input
                    type="text"
                    value={stay.name}
                    onInput={(event) => {
                        setStay((prev) => ({ ...prev, name: event.target.value }))
                    }}
                />
            </label>

            <label>Address</label>
            <div>
                <input type="text" placeholder="City" />
                <input type="text" placeholder="Country" />
                <input type="text" placeholder="Street" />
            </div>

            <div>
                <label>Drop file here or click to upload</label>
            </div>

            <label>
                Capacity
                <input type="number" placeholder="0" />
            </label>

            <label>
                Bedrooms
                <input type="number" placeholder="0" />
            </label>

            <label>
                Bathrooms
                <input type="number" placeholder="0" />
            </label>

            <label>
                Labels
                <select>
                    <option>Select labels</option>
                </select>
            </label>

            <label>
                Property type
                <select>
                    <option>Select room type</option>
                </select>
            </label>

            <label>
                Price
                <input type="number" placeholder="0" />
            </label>

            <label>
                Amenities
                <select>
                    <option>Select amenities</option>
                </select>
            </label>

            <label>
                Description
                <textarea placeholder="Description" rows="5" />
            </label>

            <button>Save</button>
        </div>
    )
}
