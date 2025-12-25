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
<section className="stay-checkout main-container">
            
<button className="back-btn" onClick={() => navigate(-1)}>
        <ReserveBackIcon className="ResereveBackIcon" stroke="black" />
      </button>
      <div className="checkout-content-wrapper">
        <header className="checkout-header">
          <h1>Request to book</h1>
        </header>

      
        <div className="checkout-main-layout">

          
          <section className="payment-container">
            <div className="checkout-card checkout-payment">
              <h2 className="payment-title">1. Add payment method</h2>
              <div className="payment-option">
                <div className="payment-header">
                  <span>💳 Credit or debit card</span>
                </div>
                <input placeholder="Card number" />
                <div className="payment-row">
                  <input placeholder="Expiration" />
                  <input placeholder="CVV" />
                </div>
                <input placeholder="ZIP code" />
                <input placeholder="Israel" />
              </div>
              
              <button className="pay-btn" onClick={onConfirmBooking}>
                Continue
              </button>
            </div>
          </section>

          <aside className="summary-container">
            <div className="checkout-card summary-card">
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
                <p>{guests ? `${guests} guest${guests > 1 ? 's' : ''}` : 'Add guests'}</p>
              </div>

              <div className="checkout-section">
                <h3>Price details</h3>
                <div className="price-row">
                  <span>{nights} nights × ${pricePerNight}</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="price-total">
                  <span>Total (USD)</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
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

