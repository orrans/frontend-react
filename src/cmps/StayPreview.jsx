import { Link, useLocation } from 'react-router-dom'
import { differenceInDays, format } from 'date-fns'
import { shortDateFmt } from '../services/stay/date.service'
import { Fragment, useState } from 'react'
import { StarIcon } from './icons/StarIcon'
import { Heart } from 'lucide-react'
import { HeartIcon } from './icons/HeartIcon'
import { Carousel } from './Carousel'
import { formatPrice, getRandomIntInclusive } from '../services/util.service'
import { useSelector } from 'react-redux'
import { addToWishlist, removeFromWishlist } from '../store/actions/user.actions'

export function StayPreview({ stay, fromDate, toDate, variant = 'explore', showPrice = true }) {
    const wishlist = useSelector((state) => state.userModule.user?.wishlist) || []
    const days = differenceInDays(toDate, fromDate)
    const isFavorite = wishlist.includes(stay._id)
    const setIsFavorite = () => {
        if (isFavorite) removeFromWishlist(stay._id)
        else addToWishlist(stay._id)
    }
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
    const [randomStayType] = useState(stayType[getRandomIntInclusive(0, stayType.length - 1)])
    const [randomRating] = useState(() => {
        const integerPart = getRandomIntInclusive(3, 5)
        if (integerPart === 5) {
            return '5.0'
        }
        const decimalPart = getRandomIntInclusive(7, 98)
        return `${integerPart}.${decimalPart}`
    })
    const [randomReviewCount] = useState(getRandomIntInclusive(20, 500))

const location = useLocation()
const params = new URLSearchParams(location.search)

const guests = {
  adults: +params.get('adults') || 0,
  kids: +params.get('children') || 0,
  infants: +params.get('infants') || 0,
  pets: +params.get('pets') || 0,
}

    return (
        // <Link to={`/stay/${stay._id}`} target="_blank" className="stay-preview">
        //    testing 
        <Link
            to={`/stay/${stay._id}`}
            className="stay-preview"
            state={{
                checkIn: fromDate,
                checkOut: toDate,
                guests,
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
                                setIsFavorite()
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
                            {randomStayType} in {stay.loc.city}
                            <span className="filtered-rating">
                                <StarIcon size={12} />
                                &nbsp;{randomRating}&nbsp;({randomReviewCount})
                            </span>
                        </h4>
                        <div className="filtered-summary">
                            <span className="stay-summary-content">{stay.summary}</span>
                            <span className="filtered-beds-capacity">
                                {stay.bedrooms} bedroom{stay.bedrooms !== 1 ? 's' : ''}&nbsp;·&nbsp;
                                {stay.bathrooms} bathroom{stay.bathrooms !== 1 ? 's' : ''}
                            </span>
                            {showPrice && (
                                <span>
                                    <span className="filtered-price">
                                        {formatPrice(stay.price * days)}
                                    </span>{' '}
                                    for {days} nights
                                </span>
                            )}
                        </div>
                    </>
                )}
                {variant === 'explore' && (
                    <>
                        <h4 className="explore-title">
                            {randomStayType} in {stay.loc.city}
                        </h4>
                        <div className="explore-details">
                            <span>
                                {format(fromDate, shortDateFmt)} - {format(toDate, 'dd')}
                            </span>
                            <div>
                                {showPrice && (
                                    <span>
                                        {formatPrice(stay.price * days)} for {days} nights
                                    </span>
                                )}
                                &nbsp;·&nbsp;
                                <span>
                                    <StarIcon />
                                    &nbsp;{randomRating}
                                </span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Link>
    )
}
