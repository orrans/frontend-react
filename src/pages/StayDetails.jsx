
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { stayService } from '../services/stay'
import { StarIcon } from '../cmps/icons/StarIcon'
import { PetsIcon } from '../cmps/icons/amenities/PetsIcon'
import { Wifi } from '../cmps/icons/amenities/Wifi'
import { FreeParking } from '../cmps/icons/amenities/FreeParking'
import { Kitchen } from '../cmps/icons/amenities/Kitchen'
import { AirConditioning } from '../cmps/icons/amenities/AirConditioning'
import { TV } from '../cmps/icons/amenities/TV'
import { Washer } from '../cmps/icons/amenities/Washer'
import { Dryer } from '../cmps/icons/amenities/Dryer'
import { CheckIn } from '../cmps/icons/highlights/CheckIn'
import { GreatLocation } from '../cmps/icons/highlights/GreatLocation'
import { RemoteWork } from '../cmps/icons/highlights/RemoteWork'

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
  Elevator: '🛗',
  'Free parking': '🚗',
  Pool: '🏊‍♂️',
  Washer: <Washer/>,
  Dryer: <Dryer/>,
  Fireplace: '🔥',
  'Outdoor shower': '🚿',
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

  
  //   For demo purposes
  const stayType = 'Apartment'
  const hostName = 'Platy'
  const hostYears = 8

  

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
//   for the future 
//   const description = stay.description

  if (!stay) return <div>Loading...</div>

  const amenities = stay.amenities || []

  return (
  <section className="stay-details">



<header className="stay-header">
  <h1 className="stay-title-main">
    Cozy and comfortable place on {stay.loc.city}, {stay.loc.country}
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
  Apartment, {stay.loc.city}, {stay.loc.country}
</p>

<div className="stay-rating-row">
  <span className="rating">
  <StarIcon size={8} />
  <span>4.89</span>
</span>

  <span className="divider">|</span>
  <span className="reviews">116 reviews</span>
</div>

</div>

<section className="stay-host">
  <img
    className="host-avatar"
    src="/img/platy.jpg"
    alt="Host Platy"
  />

  <div className="host-info">
    <h3>Hosted by Platy</h3>
    <p>Superhost · 8 years hosting</p>
  </div>
</section>


        <section className="stay-highlights">
          <div className="highlight">
            <span className="icon"><GreatLocation/></span>
            <div>
              <h4>Great location</h4>
              <p>Guests who stayed here in the past year loved the location.</p>
            </div>
          </div>

          <div className="highlight">
            <span className="icon"><CheckIn/></span>
            <div>
              <h4>Self check-in</h4>
              <p>You can check in with the building staff.</p>
            </div>
          </div>

          <div className="highlight">
            <span className="icon"><RemoteWork/></span>
            <div>
              <h4>Great for remote work</h4>
              <p>Fast wifi at 52 Mbps, plus a dedicated workspace.</p>
            </div>
          </div>
        </section>

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
            <span className="price">$5,992</span>
            <span className="sub"> for 5 nights</span>
          </div>

          <div className="booking-box">
            <div className="booking-dates">
              <div>
                <label>CHECK-IN</label>
                <span>31.01.2026</span>
              </div>
              <div>
                <label>CHECKOUT</label>
                <span>05.02.2026</span>
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
