import { useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { stayService } from '../services/stay/stay.service.local'

import { StayHighlights } from '../cmps/StayHighlights'
import { StayBooking } from '../cmps/StayBooking'

import { StarIcon } from '../cmps/icons/StarIcon'

import { PlatypusLoader } from '../cmps/PlatypusLoader'
import { UseBookingDetails } from '../customHooks/UseBookingDetails'
import { useSelector } from 'react-redux'

import {
    AirConditioning,
    Dryer,
    FreeParking,
    Kitchen,
    PetsIcon,
    TV,
    Washer,
    Wifi,
} from '../cmps/icons/amenities'

import { GoogleMap } from '../cmps/GoogleMaps'

export function StayDetails() {
    const { stayId } = useParams()
    const [stay, setStay] = useState(null)
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()
    const location = useLocation()

    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy) || {}
    const bookingState = location.state || {}

    const checkIn =
        searchParams.get('startDate') || filterBy.checkIn || bookingState.checkIn || null
    const checkOut =
        searchParams.get('endDate') || filterBy.checkOut || bookingState.checkOut || null

    const guests = {
        adults: +searchParams.get('adults') || filterBy.guests || bookingState.guests?.adults || 1,
        kids: +searchParams.get('kids') || bookingState.guests?.kids || 0,
        infants: +searchParams.get('infants') || bookingState.guests?.infants || 0,
        pets: +searchParams.get('pets') || filterBy.pets || bookingState.guests?.pets || 0,
    }

    const nights =
        checkIn && checkOut
            ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
            : 0

    const pricePerNight = stay?.price || bookingState.pricePerNight || 0
    const totalPrice = nights * pricePerNight

    const AMENITY_ICON_MAP = {
        Wifi: <Wifi />,
        'Free parking': <FreeParking />,
        TV: <TV />,
        Kitchen: <Kitchen />,
        'Air conditioning': <AirConditioning />,
        Washer: <Washer />,
        Dryer: <Dryer />,
    }

    const getAmenityIcon = (amenity) => AMENITY_ICON_MAP[amenity] || <PetsIcon />

    useEffect(() => {
        const style = 'color:#FF5A5F; font-family: monospace;'
        console.log(
            `%c          █
%c         █ █
%c        █   █
%c       █     █
%c       █     █
%c      █   █   █
%c      █  █ █  █
%c     █   █ █   █
     █    █    █
      █  █ █  █
       ██   ██
`,
            style,
            style,
            style,
            style,
            style,
            style,
            style,
            style
        )
    }, [stayId])

    useEffect(() => {
        loadStay()
    }, [stayId])

    async function loadStay() {
        try {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        } catch (err) {
            console.log('Cannot load stay', err)
        }
    }

    const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false)
    const [isDescOpen, setIsDescOpen] = useState(false)
    const [selectedReview, setSelectedReview] = useState(null)

    const description = `
Looking for a serene and unforgettable escape on the edge of nature, far from the rush yet close to authentic local life? Welcome to Azure Cliff Retreat, a peaceful hideaway overlooking the Mediterranean coastline near a quiet seaside village.
`

    if (!stay) {
        return (
            <div className="loader-center">
                <PlatypusLoader size={72} />
            </div>
        )
    }

    const amenities = stay.amenities || []

    function getGuestsText({ adults = 0, kids = 0, infants = 0, pets = 0 } = {}) {
        const totalGuests = adults + kids

        if (!totalGuests && !infants && !pets) return 'Add guests'

        const parts = []
        if (totalGuests) parts.push(`${totalGuests} guest${totalGuests > 1 ? 's' : ''}`)
        if (infants) parts.push(`${infants} infant${infants > 1 ? 's' : ''}`)
        if (pets) parts.push(`${pets} pet${pets > 1 ? 's' : ''}`)

        return parts.join(', ')
    }

    // console.log('DEBUG - URL:', searchParams.get('startDate'))
    // console.log('DEBUG - Redux Filter:', filterBy)
    // console.log('DEBUG - Final checkIn:', checkIn)

    return (
        <section className="stay-details">
            <header className="stay-header">
                <h1 className="stay-title-main">{stay.name}</h1>
            </header>

            <div className="stay-gallery">
    <div className="gallery-main">
        <img src={stay.imgUrls[0]} alt={stay.name} />
    </div>

    <div className="gallery-side">
        {stay.imgUrls.slice(1, 5).map((img, idx) => (
            <img key={idx} src={img} alt={stay.name} />
        ))}
    </div>
</div>

            <div className="stay-details-layout">
                <div className="stay-details-main">
                    <div className="stay-overview">
                        <p className="stay-subtitle">
                            {stay.type} in {stay.loc.city}, {stay.loc.country}
                        </p>

                        <p className="stay-capacity">
                            {stay.capacity} guests · {stay.bedrooms} bedroom
                            {stay.bedrooms !== 1 ? 's' : ''} · {stay.bathrooms} bathroom
                            {stay.bathrooms !== 1 ? 's' : ''}
                        </p>

                        
<div className="stay-rating-row">
  <span className="rating">
    <StarIcon size={8} />
    <span>4.73</span>
  </span>

  <span className="dot">·</span>

  <span className="reviews">{stay.reviews?.length || 0} reviews</span>
</div>

                    </div>

                    <section className="stay-host">
                        <img
                            className="host-avatar"
                            // src={'/img/platy.jpg'}
                            src={`https://i.pravatar.cc/150?u=${Math.random()}`}
                            alt={stay.host.fullname}
                        />
                        <div className="host-info">
                            <h3>Hosted by {stay.host.fullname}</h3>
                        </div>
                    </section>

                    <StayHighlights />

                    <section className="stay-description">
                        <p className="description-preview">{description}</p>
                        <button className="show-more-btn" onClick={() => setIsDescOpen(true)}>
                            Show more
                        </button>
                    </section>
                </div>

                <StayBooking
                    stay={stay}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    guests={guests}
                    nights={nights}
                    totalPrice={totalPrice}
                    pricePerNight={pricePerNight}
                    getGuestsText={getGuestsText}
                />
            </div>

            <section className="stay-amenities">
                <h2>What this place offers</h2>

                <ul className="amenities-list">
                    {amenities.slice(0, 8).map((amenity) => (
                        <li key={amenity}>
                            <span>{getAmenityIcon(amenity)}</span>
                            {amenity}
                        </li>
                    ))}
                </ul>

                <button className="show-more-btn" onClick={() => setIsAmenitiesOpen(true)}>
                    Show all {amenities.length} amenities
                </button>
            </section>

            <section className="stay-sleep">
                <h2>Where you’ll sleep</h2>

                <div className="sleep-card">
                    <img src={stay.imgUrls[0]} alt="Where you’ll sleep" />
                </div>
            </section>

            {/* </div> */}
            <section className="stay-reviews">
                {stay.reviews &&
                    stay.reviews.slice(0, 6).map((review, idx) => (
                        <article key={review.id || idx} className="review-card">
                            <header className="review-header">
                                <img
                                    className="review-avatar"
                                    // src={'/img/platy.jpg'}
                                    src={`https://i.pravatar.cc/150?u=${Math.random()}`}
                                    alt={review.by.fullname}
                                />
                                <div className="review-author-info">
                                    <h4>{review.by.fullname}</h4>
                                    <span className="review-date">
                                        {review.at
                                            ? new Date(review.at).toLocaleDateString('en-GB', {
                                                  month: 'long',
                                                  year: 'numeric',
                                              })
                                            : 'Recently'}
                                    </span>
                                </div>
                            </header>

                            <div className="review-rating-stars">
                                <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
                            </div>

                            <p className="review-text">{review.txt}</p>

                            <button className="show-more" onClick={() => setSelectedReview(review)}>
                                Show more
                            </button>
                        </article>
                    ))}

                {stay.reviews && stay.reviews.length > 0 && (
                    <button className="show-all-reviews-btn">
                        Show all {stay.reviews.length} reviews
                    </button>
                )}
            </section>
            <section className="stay-location">
                <h2 className="location-title">Where you’ll be</h2>

                <p className="location-subtitle">
                    {stay.loc.city}, {stay.loc.country}
                </p>

                <div className="location-map-container">
                    <GoogleMap stays={[stay]} wishlist={true} hoveredStayId={stay._id}/>
                </div>
            </section>

            {isAmenitiesOpen && (
                <div className="modal-overlay" onClick={() => setIsAmenitiesOpen(false)}>
                    <div className="modal" onClick={(ev) => ev.stopPropagation()}>
                        <div className="modal-header">
                            <button
                                className="modal-close-btn"
                                onClick={() => setIsAmenitiesOpen(false)}>
                                ✕
                            </button>
                        </div>
                        <div className="modal-body">
                            <h2>What this place offers</h2>
                            <ul className="amenities-modal-list">
                                {amenities.map((amenity, idx) => (
                                    <li key={`${amenity}-${idx}`}>
                                        <span>{getAmenityIcon(amenity)}</span>
                                        {amenity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {selectedReview && (
                <div className="review-modal-overlay" onClick={() => setSelectedReview(null)}>
                    <div className="review-modal-container" onClick={(ev) => ev.stopPropagation()}>
                        <div className="review-modal-header">
                            <button
                                className="modal-close-x"
                                onClick={() => setSelectedReview(null)}>
                                ✕
                            </button>
                        </div>
                        <div className="review-modal-body">
                            <header className="review-header">
                                <img
                                    className="review-avatar"
                                    src={`https://i.pravatar.cc/150?u=${
                                        selectedReview.by?.fullname || 'guest'
                                    }`}
                                    alt="avatar"
                                />
                                <div className="review-author-info">
                                    <h4 style={{ margin: 0 }}>{selectedReview.by?.fullname}</h4>
                                    <span className="review-date">
                                        {selectedReview.at
                                            ? new Date(selectedReview.at).toLocaleDateString(
                                                  'en-GB',
                                                  { month: 'long', year: 'numeric' }
                                              )
                                            : ''}
                                    </span>
                                </div>
                            </header>
                            <div className="review-rating-stars" style={{ margin: '16px 0' }}>
                                <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
                            </div>
                            <p className="full-review-txt">{selectedReview.txt}</p>
                        </div>
                    </div>
                </div>
            )}

            {isDescOpen && (
                <div className="modal-overlay" onClick={() => setIsDescOpen(false)}>
                    <div className="modal" onClick={(ev) => ev.stopPropagation()}>
                        <div className="modal-header">
                            <button
                                className="modal-close-btn"
                                onClick={() => setIsDescOpen(false)}>
                                ✕
                            </button>
                        </div>
                        <div className="modal-body">
                            <h2>About this place</h2>
                            <p style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
