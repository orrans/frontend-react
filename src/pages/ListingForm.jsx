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
        </div>
    )
}
