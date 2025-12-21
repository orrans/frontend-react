import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { stayService } from '../services/stay'

export function StayCheckout() {
  const { stayId } = useParams()
  const navigate = useNavigate()
  const [stay, setStay] = useState(null)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)


  useEffect(() => {
    loadStay()
  }, [stayId])

  async function loadStay() {
    const stay = await stayService.getById(stayId)
    setStay(stay)
  }

  if (!stay) return <div>Loading...</div>

  return (
    <section className="stay-checkout">

      <header className="checkout-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
  <span className="back-arrow"></span>
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
          <p>7–10 Jan 2026</p>
        </div>

        <div className="checkout-section">
          <h3>Guests</h3>
          <p>1 adult</p>
        </div>

        <div className="checkout-section">
          <h3>Price details</h3>
          <div className="price-row">
            <span>3 nights × $1,027</span>
            {/* <span>$3,081</span> */}
          </div>
          <div className="price-total">
            <span>Total (USD)</span>
            <span>$3,081</span>
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

  <button className="pay-btn" onClick={() => setIsSuccessOpen(true)}>
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

