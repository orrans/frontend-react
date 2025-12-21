import { userService } from '../services/user/index.js'
import { ChevronRightIcon } from './icons/ChevronRightIcon.jsx'
import { StayPreview } from './StayPreview.jsx'

export function StayExploreList({ stays, title }) {
    const fromDate = new Date()
    const toDate = new Date()
    toDate.setDate(toDate.getDate() + 5)
    const displayedStays = stays.slice(0, 8)

    return (
        <section className="explore-list-container">
            <div className="stay-list-title-row">
                <h2>
                    {title} <ChevronRightIcon />
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
