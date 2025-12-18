import { userService } from '../services/user/index.js'
import { StayPreview } from './StayPreview.jsx'

export function StayExploreList({ stays, title }) {
    const fromDate = new Date()
    const toDate = new Date()
    toDate.setDate(toDate.getDate() + 2)

    return (
        <section className='explore-list-container'>
            <div className="stay-list-title-row">
                <h2>{title}</h2>
            </div>
            <div className="explore-grid-container">
                <ul className="stay-explore-list">
                    {stays.map((stay) => (
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
