import { Link } from 'react-router-dom'
import { ChevronRightIcon } from './icons/ChevronRightIcon.jsx'
import { StayPreview } from './StayPreview.jsx'
import { useMemo } from 'react'

export function StayExploreList({ stays, title }) {
    const fromDate = new Date()
    const toDate = new Date()
    toDate.setDate(toDate.getDate() + 5)

    const displayedStays = stays.slice(0, 8)

    const firstStay = displayedStays[0]
    const city = firstStay?.loc.city || ''
    const stayType = firstStay?.type || 'Home'

    const dynamicTitle = useMemo(() => {
        if (!city) return ''

        const structures = [
            { text: `Popular ${stayType}s in ${city}` },
            { text: `Available in ${city} this weekend` },
            { text: `Available next month in ${city}` },
            { text: `Check out ${stayType}s in ${city}` },
            { text: `Unique ${stayType}s in ${city}` },
        ]

        const randomStructure = structures[Math.floor(Math.random() * structures.length)]
        return randomStructure.text
    }, [city, stayType])

    return (
        <section className="explore-list-container">
            <div className="stay-list-title-row">
                <h2>
                    <Link to={`/stay?loc=${city}, ${firstStay?.loc.country || ''}`}>
                        {dynamicTitle}
                        <span className="loc-chev-link">
                            <ChevronRightIcon strokeWidth={5.33333} />
                        </span>
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
