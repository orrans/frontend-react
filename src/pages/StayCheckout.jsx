import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { stayService } from '../services/stay'
import { ReserveBackIcon } from '../cmps/icons/ReserveBackIcon'
import { orderServiceLocal } from '../services/order/order.service.local.js'
// import { userService } from '../services/user.service.js' 

export function StayCheckout() {
  const { stayId } = useParams()
  const navigate = useNavigate()
  const [stay, setStay] = useState(null)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

    const location = useLocation()
  const bookingState = location.state || {}

  const {
    checkIn,
    checkOut,
    guests,
    nights,
    pricePerNight,
    totalPrice
  } = bookingState;

  

  useEffect(() => {
    loadStay()
  }, [stayId])

  async function loadStay() {
    const stay = await stayService.getById(stayId)
    setStay(stay)
  }

async function onConfirmBooking() {
    try {
        const orderToSave = {
            startDate: checkIn,
            endDate: checkOut,
            totalPrice: totalPrice,
            stay: {
                _id: stay._id,
                name: stay.name,
                price: pricePerNight
            },
            host: {
                _id: stay.host._id,
                fullname: stay.host.fullname
            },
            guest: {
                _id: 'u101', 
                fullname: 'User Name'
            },
            guests: {
                adults: guests,
                kids: 0
            },
            status: 'pending',
            msgs: []
        }

        await orderServiceLocal.save(orderToSave)
        setIsSuccessOpen(true) 
        
    } catch (err) {
        console.error('Had issues booking:', err)
        alert('Could not complete booking')
    }
  }

  if (!stay) return <div>Loading...</div>

  

  return (
    <section className="stay-checkout">

      <header className="checkout-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
  <ReserveBackIcon className="ResereveBackIcon" stroke='black'/>
</button>


        <h1>Request to book</h1>
      </header>

      <div className="checkout-card">

        <div className="checkout-top">
          <img src={stay.imgUrls[0]} alt={stay.name} />

          <div className="checkout-summary">
            <h2>{stay.name}</h2>
            <p>⭐ 4.94 · Superhost</p>
          </div>
        </div>

        <div className="checkout-section">
          <h3>Dates</h3>
          <p>{checkIn && checkOut
      ? `${new Date(checkIn).toLocaleDateString('en-GB')} – ${new Date(checkOut).toLocaleDateString('en-GB')}`
      : 'Add dates'}</p>
        </div>

        <div className="checkout-section">
          <h3>Guests</h3>
          <p>{guests
      ? `${guests} guest${guests > 1 ? 's' : ''}`
      : 'Add guests'}</p>
        </div>

        <div className="checkout-section">
          <h3>Price details</h3>
          <div className="price-row">
            <span>{nights} nights × ${pricePerNight}</span>
          </div>
          <div className="price-total">
            <span>Total (USD)</span>
            <span>${totalPrice}</span>
          </div>
        </div>

      </div>

      <div className="checkout-card checkout-payment">

  <h2 className="payment-title">1. Add payment method</h2>

  <div className="payment-option active">
    <div className="payment-header">
      <span>💳 Credit or debit card</span>
      <input type="radio" checked readOnly />
    </div>

    <input placeholder="1234 1234 1234 1234" />
    <div className="payment-row">
      <input placeholder="01 / 26" />
      <input placeholder="123" />
    </div>
    <input placeholder="12345" />
    <input placeholder="Israel" />
  </div>

  {/* <button className="pay-btn" onClick={() => setIsSuccessOpen(true)}> */}
  <button className="pay-btn" onClick={onConfirmBooking}>
    Continue
  </button>

</div>

{isSuccessOpen && (
  <div className="modal-overlay">
    <div className="success-modal">
      <button
        className="close-btn"
        onClick={() => setIsSuccessOpen(false)}
      >
        ✕
      </button>
      <h2>Payment successful!</h2>
    </div>
  </div>
)}

    </section>
  )
}

