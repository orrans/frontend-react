import { Link } from 'react-router-dom'
import { differenceInDays, format } from 'date-fns'
import { shortDateFmt } from '../services/stay/date.service'

export function StayExplorePreview({ stay, fromDate, toDate }) {
    const days = differenceInDays(toDate, fromDate)
    return (
        <Link to={`/stay/${stay._id}`} target="_blank" className="stay-preview">
            {stay.imgUrls && stay.imgUrls.length > 0 && (
                <img src={stay.imgUrls[0]} alt={stay.name} style={{ maxWidth: '200px' }} />
            )}
            <h4>
                {stay.type} in {stay.name}
            </h4>
            <span>
                {format(fromDate, shortDateFmt)} - {format(toDate, shortDateFmt)}
            </span>
            <span>
                ${stay.price * days} for {days} nights
            </span>
        </Link>
    )
}
