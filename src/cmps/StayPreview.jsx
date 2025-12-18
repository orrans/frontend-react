import { Link } from 'react-router-dom'
import { differenceInDays, format } from 'date-fns'
import { shortDateFmt } from '../services/stay/date.service'
import { Fragment, useState } from 'react'
import { StarIcon } from './icons/StarIcon'
import { Heart } from 'lucide-react'
import { HeartIcon } from './icons/HeartIcon'

export function StayPreview({ stay, fromDate, toDate, variant = 'explore' }) {
    const days = differenceInDays(toDate, fromDate)
    const [isFavorite, setIsFavorite] = useState(false)

    return (
        <Link to={`/stay/${stay._id}`} target="_blank" className="stay-preview">
            <div className="stay-inner-img">
                <div className="img-overlay">
                    <HeartIcon
                        className="favorite"
                        onClick={(ev) => {
                            ev.preventDefault()
                            ev.stopPropagation()
                            setIsFavorite((prev) => !prev)
                        }}
                        fill={isFavorite ? `var(--clr-brand)` : undefined}
                    />
                </div>
                {stay.imgUrls && stay.imgUrls.length > 0 && (
                    <img src={stay.imgUrls[0]} alt={stay.name} />
                )}
            </div>
            <div className="stay-inner-details">
                <h4>
                    {stay.type} in {stay.name}
                </h4>
                {variant === 'normal' && (
                    <Fragment>
                        <span>{stay.summary}</span>
                        <span>
                            {stay.beds} &bull; {stay.bedrooms}
                        </span>
                    </Fragment>
                )}
                {variant === 'explore' && (
                    <span>
                        {format(fromDate, shortDateFmt)} - {format(toDate, 'dd')}
                    </span>
                )}
                <div>
                    <span>
                        ${stay.price * days} for {days} nights
                    </span>
                    &nbsp; &bull; &nbsp;
                    <span>
                        <StarIcon />
                        4.9
                    </span>
                </div>
            </div>
        </Link>
    )
}
