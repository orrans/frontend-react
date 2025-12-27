import { Link } from 'react-router-dom'
import { ChevronRightIcon } from './icons/ChevronRightIcon.jsx'
import { StayPreview } from './StayPreview.jsx'
import { getRandomIntInclusive } from '../services/util.service.js'

export function StayExploreList({ stays, title }) {
    const fromDate = new Date()
    const toDate = new Date()
    toDate.setDate(toDate.getDate() + 5)
    const displayedStays = stays.slice(0, 8)
    const stayType = [
        'Apartment',
        'House',
        'Villa',
        'Cottage',
        'Cabin',
        'Bungalow',
        'Condo',
        'Loft',
        'Townhouse',
        'Chalet',
    ]

    return (
        <section className="explore-list-container">
            <div className="stay-list-title-row">
                <h2>
                    <Link to={`/stay?loc=${displayedStays[0]?.loc.city || ''}, ${displayedStays[0]?.loc.country || ''}`}>
                        {stayType[getRandomIntInclusive(0, stayType.length - 1)]} in {displayedStays[0]?.loc.city}
                        <ChevronRightIcon strokeWidth={5.33333} />
                    </Link>
                </h2>
            </div>
            <div className="explore-grid-container">
                <ul className="stay-explore-list">
                    {displayedStays.map((stay) => (
                        <li key={stay._id}>
                            <StayPreview
                                stay={stay}
                                fromDate={fromDate}
                                toDate={toDate}
                                variant="explore"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
