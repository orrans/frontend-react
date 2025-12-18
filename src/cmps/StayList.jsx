import { StayPreview } from './StayPreview.jsx'

export function StayList({ stays, onRemoveStay, onUpdateStay }) {
    const fromDate = new Date()
    const toDate = new Date()
    toDate.setDate(toDate.getDate() + 2)

    return (
        <section>
            <ul className="stay-list">
                {stays.map((stay) => (
                    <li key={stay._id}>
                        <StayPreview stay={stay} fromDate={fromDate} toDate={toDate} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
