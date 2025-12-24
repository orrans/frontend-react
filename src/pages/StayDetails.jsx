
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { stayService } from '../services/stay/stay.service.local'
import { StayHighlights } from '../cmps/StayHighlights'
import { StarIcon } from '../cmps/icons/StarIcon'

import { PlatypusLoader } from '../cmps/PlatypusLoader'
import { UseBookingDetails } from '../customHooks/UseBookingDetails'

import {
  AirConditioning,
  Dryer,
  FreeParking,
  Kitchen,
  PetsIcon,
  TV,
  Washer,
  Wifi
} from '../cmps/icons/amenities'

import { StayLocationMap } from '../cmps/StayLocationMap'

export function StayDetails() {
  const { stayId } = useParams()
  const [stay, setStay] = useState(null)
  const navigate = useNavigate()

  const location = useLocation()
  const bookingState = location.state || {}

  const {
    checkIn,
    checkOut,
    guests = 1,
    nights,
    pricePerNight
  } = bookingState

  const totalPrice =
    nights && pricePerNight ? nights * pricePerNight : null

  // need to change icons
  const AMENITY_ICON_MAP = {
    Wifi: <Wifi />,
    'Free parking': <FreeParking />,
    TV: <TV />,
    Kitchen: <Kitchen />,
    'Air conditioning': <AirConditioning />,
    Washer: <Washer />,
    Dryer: <Dryer />
  }

  const getAmenityIcon = (amenity) =>
    AMENITY_ICON_MAP[amenity] || <PetsIcon />

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
              &nbsp;·&nbsp;
              <span className="reviews">
                {stay.reviews?.length || 0} reviews
              </span>
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
            <button
              className="show-more-btn"
              onClick={() => setIsDescOpen(true)}
            >
              Show more
            </button>
          </section>

        </div>

        <aside className="stay-booking">
          <div className="booking-sticky">
            <div className="booking-card">

              <div className="booking-price">
                {!nights ? (
                  <span className="price-placeholder">
                    Add dates for prices
                  </span>
                ) : (
                  <>
                    <span>${totalPrice.toLocaleString()}</span>
                    <span> for {nights} nights</span>
                  </>
                )}
              </div>

              <div className="booking-box">
                <div className="booking-dates">
                  <div>
                    <label>CHECK-IN</label>
                    <span>
                      {checkIn
                        ? new Date(checkIn).toLocaleDateString('en-GB')
                        : 'Add date'}
                    </span>
                  </div>

                  <div>
                    <label>CHECKOUT</label>
                    <span>
                      {checkOut
                        ? new Date(checkOut).toLocaleDateString('en-GB')
                        : 'Add date'}
                    </span>
                  </div>
                </div>

                <div className="booking-guests">
                  <label>GUESTS</label>
                  <span>
                    {guests} guest{guests > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <button
  className="reserve-btn"
  onClick={() =>
    navigate(`/stay/${stayId}/checkout`, {
      state: {
        checkIn,
        checkOut,
        guests,
        nights,
        pricePerNight,
        totalPrice
      }
    })
  }
>
  Reserve
</button>


              <p className="booking-note">
                You won’t be charged yet
              </p>
            </div>
          </div>
        </aside>
      </div>

      <section className="stay-amenities">
        <h2>What this place offers</h2>

        <ul className="amenities-list">
          {amenities.slice(0, 3).map((amenity) => (
            <li key={amenity}>
              <span>{getAmenityIcon(amenity)}</span>
              {amenity}
            </li>
          ))}
        </ul>

        <button
          className="show-more-btn"
          onClick={() => setIsAmenitiesOpen(true)}
        >
          Show all {amenities.length} amenities
        </button>
      </section>

      <section className="stay-sleep">
  <h2>Where you’ll sleep</h2>

  <div className="sleep-card">
    <img
      src={stay.imgUrls[0]}
      alt="Where you’ll sleep"
    />
  </div>
</section>

{/* <div className="divider"></div> */}

<section className="stay-reviews">
  {stay.reviews && stay.reviews.slice(0, 6).map((review, idx) => (
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
            {review.at ? new Date(review.at).toLocaleDateString('en-GB', {
              month: 'long',
              year: 'numeric',
            }) : 'Recently'}
          </span>
        </div>
      </header>

      <div className="review-rating-stars">
        <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
      </div>

      <p className="review-text">{review.txt}</p>
      
      <button className="show-more" onClick={() => setSelectedReview(review)}>Show more</button>
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
    {/* the map will be here  */}
{/* <StayLocationMap stay={stay} /> */}
  </div>
</section>


  
  {isAmenitiesOpen && (
    <div className="modal-overlay" onClick={() => setIsAmenitiesOpen(false)}>
      <div className="modal" onClick={(ev) => ev.stopPropagation()}>
        <div className="modal-header">
          <button className="modal-close-btn" onClick={() => setIsAmenitiesOpen(false)}>✕</button>
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
          <button className="modal-close-x" onClick={() => setSelectedReview(null)}>✕</button>
        </div>
        <div className="review-modal-body">
          <header className="review-header">
            <img
              className="review-avatar"
              src={`https://i.pravatar.cc/150?u=${selectedReview.by?.fullname || 'guest'}`}
              alt="avatar"
            />
            <div className="review-author-info">
              <h4 style={{ margin: 0 }}>{selectedReview.by?.fullname}</h4>
              <span className="review-date">
                {selectedReview.at ? new Date(selectedReview.at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : ''}
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
          <button className="modal-close-btn" onClick={() => setIsDescOpen(false)}>✕</button>
        </div>
        <div className="modal-body">
          <h2>About this place</h2>
          <p style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>{description}</p>
        </div>
      </div>
    </div>
  )}
</section>
  )
}
  