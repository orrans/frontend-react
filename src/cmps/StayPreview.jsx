import { Link } from 'react-router-dom'
import { differenceInDays, format } from 'date-fns'
import { shortDateFmt } from '../services/stay/date.service'
import { Fragment, useState } from 'react'
import { StarIcon } from './icons/StarIcon'
import { Heart } from 'lucide-react'
import { HeartIcon } from './icons/HeartIcon'
import { Carousel } from './Carousel'
import { formatPrice, getRandomIntInclusive } from '../services/util.service'


export function StayPreview({ stay, fromDate, toDate, variant = 'explore' }) {
    const days = differenceInDays(toDate, fromDate)
    const [isFavorite, setIsFavorite] = useState(false)
    const stayType = [
        'Apartment',
        'House',
        'Villa',
        'Cottage',
        'Cabin',
        'Bungalow',
        'Condo',
        'Loft',
        'Townhouse',
        'Chalet',
    ]

    return (
        // <Link to={`/stay/${stay._id}`} target="_blank" className="stay-preview">
    //    testing 
        <Link
  to={`/stay/${stay._id}`}
  className="stay-preview"
  state={{
    checkIn: fromDate,
    checkOut: toDate,
    guests: 1,
    nights: differenceInDays(toDate, fromDate),
    pricePerNight: stay.price
  }}
>

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
                {variant === 'filtered' && (
                    <>
                        <h4 className="filtered-title">
                            {stayType[getRandomIntInclusive(0, stayType.length - 1)]} in{' '}
                            {stay.loc.city}
                            <span className="filtered-rating">
                                <StarIcon size={12} />
                                &nbsp;4.93&nbsp;(509)
                            </span>
                        </h4>
                        <div className="filtered-summary">
                            <span className="stay-summary-content">{stay.summary}</span>
                            <span className="filtered-beds-capacity">
                                {stay.bedrooms} bedroom{stay.bedrooms !== 1 ? 's' : ''}&nbsp;·&nbsp;
                                {stay.bathrooms} bathroom{stay.bathrooms !== 1 ? 's' : ''}
                            </span>
                            <span>
                                <span className="filtered-price">
                                    {formatPrice(stay.price * days)}
                                </span>{' '}
                                for {days} nights
                            </span>
                        </div>
                    </>
                )}
                {variant === 'explore' && (
                    <>
                        <h4 className="explore-title">
                            {stayType[getRandomIntInclusive(0, stayType.length - 1)]} in{' '}
                            {stay.loc.city}
                        </h4>
                        <div className="explore-details">
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
                                    &nbsp;4.93
                                </span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Link>
    )
}
