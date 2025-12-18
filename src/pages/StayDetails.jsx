
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { stayService } from '../services/stay'

export function StayDetails() {
  const { stayId } = useParams()
  const [stay, setStay] = useState(null)

  
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

  if (!stay) return <div>Loading...</div>

  return (
  <section className="stay-details">
    <div className="stay-details-layout">

      <div className="stay-details-main">

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

        <h1>{stay.name}</h1>
        <p>{stay.loc.city}, {stay.loc.country}</p>

        <section className="stay-highlights">
          <div className="highlight">
            <span className="icon">🛁</span>
            <div>
              <h4>Relax in the hot tub</h4>
              <p>One of the few places in the area with this amenity.</p>
            </div>
          </div>

          <div className="highlight">
            <span className="icon">🔑</span>
            <div>
              <h4>Self check-in</h4>
              <p>You can check in with the building staff.</p>
            </div>
          </div>

          <div className="highlight">
            <span className="icon">⭐</span>
            <div>
              <h4>Highly rated location</h4>
              <p>Guests love the area for its convenience and atmosphere.</p>
            </div>
          </div>
        </section>

      </div>

      <aside className="stay-booking">
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
                <label>CHECK-OUT</label>
                <span>05.02.2026</span>
              </div>
            </div>

            <div className="booking-guests">
              <label>GUESTS</label>
              <span>1 guest</span>
            </div>
          </div>

          <button className="reserve-btn">
            Reserve
          </button>

          <p className="booking-note">
            You won’t be charged yet
          </p>

        </div>
      </aside>

    </div>
  </section>
)
}
