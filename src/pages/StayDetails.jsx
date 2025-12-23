
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { stayService } from '../services/stay/stay.service.local'
import { StayHighlights } from '../cmps/StayHighlights'
import { StarIcon } from '../cmps/icons/StarIcon'

import { PlatypusLoader } from '../cmps/PlatypusLoader'
import { UseBookingDetails } from '../customHooks/UseBookingDetails'
import { useLocation } from 'react-router-dom'



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

// need to change icons

  const AMENITY_ICON_MAP = {
  Wifi: <Wifi/>,
  'Free parking': <FreeParking/>,
  TV: <TV/>,
  Kitchen: <Kitchen/>,
  'Air conditioning': <AirConditioning/>,
  // Elevator: '🛗',
  // 'Free parking': '🚗',
  // Pool: '🏊‍♂️',
  Washer: <Washer/>,
  Dryer: <Dryer/>,
  // Fireplace: '🔥',
  // 'Outdoor shower': '🚿',
}

const getAmenityIcon = (amenity) =>
  AMENITY_ICON_MAP[amenity] || <PetsIcon/>

  
  useEffect(() => {
    const style = 'color:#FF5A5F; font-family: monospace;'
// for or-ran
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
  
  const description = `
  Looking for a serene and unforgettable escape on the edge of nature, far from the rush yet close to authentic local life? Welcome to Azure Cliff Retreat, a peaceful hideaway overlooking the Mediterranean coastline near a quiet seaside village.

Perched above the sea, Azure Cliff Retreat offers breathtaking panoramic views, gentle ocean breezes, and an atmosphere designed for complete relaxation. This is the perfect destination for travelers seeking a balance between tranquility, inspiration, and meaningful connection to the surrounding landscape and culture.

The Accommodation

You will stay in a beautifully designed retreat that blends modern comfort with natural materials and soft coastal aesthetics. Warm wood textures, stone details, and large open windows create a bright and calming space that feels both elegant and welcoming — a true home away from home.

Each suite is thoughtfully arranged to provide privacy, comfort, and stunning views of the sea or surrounding cliffs. Whether you’re enjoying your morning coffee on the terrace or unwinding indoors at sunset, every moment is designed to slow you down and help you reconnect with yourself.

Relaxation & Experience

Azure Cliff Retreat features a peaceful outdoor infinity pool overlooking the horizon, a private spa area with a sauna and relaxation room, and shaded lounge spaces perfect for reading or quiet conversation. After a day of coastal walks, swimming, or exploring nearby villages, you can fully unwind in an environment made for rest and renewal.

For those interested in culture and connection, the retreat occasionally hosts small gatherings, sunset dinners, and creative workshops where guests can meet fellow travelers and local artists, sharing stories, ideas, and experiences in an intimate and welcoming setting.

A Different Way to Travel

Azure Cliff Retreat is more than just a place to stay — it is an invitation to experience the coast slowly and deeply. Here, time feels unhurried, nature sets the rhythm, and comfort meets authenticity.

Book your stay through Airbnb or Booking and allow yourself to experience a dream vacation where calm, beauty, and inspiration come together above the sea.
  `

  // if (!stay) return <div>Loading...</div>
  
  const booking = UseBookingDetails(stay?.price)
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
  <h1 className="stay-title-main">
    {stay.name}
  </h1>
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
      
      {/* need more love  */}
<div className="stay-overview">

<p className="stay-subtitle">
  {stay.type} in {stay.loc.city}, {stay.loc.country}
</p>

<p className="stay-capacity">
  {stay.capacity} guests&nbsp;·&nbsp;
  {stay.bedrooms} bedroom{stay.bedrooms !== 1 ? 's' : ''}&nbsp;·&nbsp;
  {stay.bathrooms} bathroom{stay.bathrooms !== 1 ? 's' : ''}
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
    src={'/img/platy.jpg'}
    // src={stay.host.pictureUrl}
    alt={stay.host.fullname}
  />

  <div className="host-info">
    <h3>Hosted by {stay.host.fullname}</h3>
  </div>
</section>

<StayHighlights />


<section className="stay-description">
  <p className="description-preview">
    {description}
  </p>

  <button
    className="show-more-btn"
    onClick={() => setIsDescOpen(true)}
  >
    Show more
  </button>
</section>


      </div>

      <aside className="stay-booking">
        {/* test */}
        <div className="booking-sticky">
        <div className="booking-card">

         <div className="booking-price">
  {booking.nights === 0 ? (
    <span className="price-placeholder">
      Add dates for prices
    </span>
  ) : (
    <>
      <span>
        {booking.nights} nights
      </span>
      <span>
        ${booking.totalPrice.toLocaleString()}
      </span>
    </>
  )}
</div>



          <div className="booking-box">
            <div className="booking-dates">
              <div>
                <label>CHECK-IN</label>
                <span>
  {booking.checkIn
    ? new Date(booking.checkIn).toLocaleDateString('en-GB')
    : 'Add date'}
</span>

              </div>
              <div>
                <label>CHECKOUT</label>
                <span>
  {booking.checkOut
    ? new Date(booking.checkOut).toLocaleDateString('en-GB')
    : 'Add date'}
</span>

              </div>
            </div>

            <div className="booking-guests">
              <label>GUESTS</label>
              <span>1 guest</span>
            </div>
          </div>

          <button
  className="reserve-btn"
  onClick={() => navigate(`/stay/${stayId}/checkout`)}
>
  Reserve
</button>


          <p className="booking-note">
            You won’t be charged yet
          </p>
        </div>
        {/* test */}
        </div>
      </aside>
    </div>
{isDescOpen && (
  <div className="modal-overlay" onClick={() => setIsDescOpen(false)}>
    <div className="modal" onClick={(ev) => ev.stopPropagation()}>

      <div className="modal-header">
        <button
          className="modal-close-btn"
          onClick={() => setIsDescOpen(false)}
        >
          ✕
        </button>
      </div>

      <div className="modal-body">
        <h2>About this place</h2>

        <div className="modal-text">
          {description.split('\n').map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      </div>

    </div>
  </div>
)}

<section className="stay-sleep">
  <h2>Where you’ll sleep</h2>

  <div className="sleep-card">
    <img
      src={stay.imgUrls[0]}
      alt="Where you’ll sleep"
    />
  </div>
</section>

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

<section className="stay-reviews">
  {stay.reviews.map((review, idx) => (
  <article key={review.id || idx} className="review-card">
      <header className="review-header">
        <img
          className="review-avatar"
          src={'/img/platy.jpg'}
          alt={review.by.fullname}
        />
        <div>
          <h4>{review.by.fullname}</h4>
          <span>★★★★★</span>
        </div>
      </header>

      <p>{review.txt}</p>

      <button className="show-more">Show more</button>
    </article>
  ))}
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
        <button
          className="modal-close-btn"
          onClick={() => setIsAmenitiesOpen(false)}
        >
          ✕
        </button>
      </div>

      <div className="modal-body">
        <h2>What this place offers</h2>

        <ul className="amenities-modal-list">
          {amenities.map((amenity) => (
            <li key={amenity}>
              <span>{getAmenityIcon(amenity)}</span>
              {amenity}
            </li>
          ))}
        </ul>
      </div>

    </div>
  </div>
)}
</section>
)
}
