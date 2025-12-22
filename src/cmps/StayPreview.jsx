import { Link } from 'react-router-dom'
import { differenceInDays, format } from 'date-fns'
import { shortDateFmt } from '../services/stay/date.service'
import { Fragment, useState } from 'react'
import { StarIcon } from './icons/StarIcon'
import { Heart } from 'lucide-react'
import { HeartIcon } from './icons/HeartIcon'
import { Carousel } from './Carousel'
import { formatPrice } from '../services/util.service'

export function StayPreview({ stay, fromDate, toDate, variant = 'explore' }) {
    const days = differenceInDays(toDate, fromDate)
    const [isFavorite, setIsFavorite] = useState(false)

    return (
        <Link to={`/stay/${stay._id}`} target="_blank" className="stay-preview">
            <div className="stay-inner-img">
                <div className="img-overlay">
                    <div className="favorite-icon-container">
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
                </div>
                {variant === 'explore' && stay.imgUrls && stay.imgUrls.length > 0 && (
                    <img src={stay.imgUrls[0]} alt={stay.name} />
                )}
                {variant === 'filtered' && <Carousel imgs={stay.imgUrls} />}
            </div>
            <div className="stay-inner-details">
                <h4 className="filtered-title">
                    {stay.type} in {stay.name}
                    <span className="filtered-rating">
                        <StarIcon size={12} />
                        &nbsp;4.93 (509)
                    </span>
                </h4>
                {variant === 'filtered' && (
                    <div className="filtered-summary">
                        <span>{stay.summary}</span>
                        <span className="filtered-beds-capacity">
                            {stay.beds}&nbsp;·&nbsp;{stay.bedrooms}
                        </span>
                        {/* <span className="filtered-dates">
                            {format(fromDate, shortDateFmt)} - {format(toDate, 'dd')}
                        </span> */}
                        <span>
                            <span className="filtered-price">{formatPrice(stay.price * days)}</span>{' '}
                            for {days} nights
                        </span>
                    </div>
                )}
                {variant === 'explore' && (
                    <>
                        <span>
                            {format(fromDate, shortDateFmt)} - {format(toDate, 'dd')}
                        </span>
                        <div>
                            <span>
                                {formatPrice(stay.price * days)} for {days} nights
                            </span>
                            &nbsp;·&nbsp;
                            <span>
                                <StarIcon />
                                4.93
                            </span>
                        </div>
                    </>
                )}
            </div>
        </Link>
    )
}
