
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

    <p>
      {stay.loc.city}, {stay.loc.country}
    </p>
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

 
    <p>
      <strong>${stay.price}</strong> / night
    </p>

    <button
      style={{
        backgroundColor: '#FF5A5F',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer'
      }}
    >
      Reserve
    </button>

  </section>
)

}
