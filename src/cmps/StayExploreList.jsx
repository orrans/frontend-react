import { userService } from '../services/user/index.js'
import { StayExplorePreview } from './StayExplorePreview.jsx'
import { StayPreview } from './StayPreview.jsx'

export function StayExploreList({ stays }) {
    const fromDate = new Date()
    const toDate = new Date()
    toDate.setDate(toDate.getDate() + 2)

    return (
        <section>
            <ul className="stay-list">
                {stays.map((stay) => (
                    <li key={stay._id}>
                        <StayExplorePreview stay={stay} fromDate={fromDate} toDate={toDate} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
