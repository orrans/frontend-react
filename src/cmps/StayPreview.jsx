import { Link } from 'react-router-dom'

export function StayPreview({ stay }) {
    return (
        <Link  to={`/stay/${stay._id}`} target='_blank' className="stay-preview">
            {stay.imgUrls && stay.imgUrls.length > 0 && (
                <img src={stay.imgUrls[0]} alt={stay.name} style={{ maxWidth: '200px' }} />
            )}
            <h4>{stay.name}</h4>
            <p>
                {stay.loc?.city}, {stay.loc?.country}
            </p>
            <p>
                <strong>${stay.price}</strong> / night
            </p>
        </Link>
    )
}
