import { StayPreview } from './StayPreview.jsx'

export function StayList({ stays, onRemoveStay, onUpdateStay }) {
    return (
        <section>
            <ul className="stay-list">
                {stays.map((stay) => (
                    <li key={stay._id}>
                        <StayPreview stay={stay} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
