import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { stayService } from '../services/stay'
import { ReserveBackIcon } from '../cmps/icons/ReserveBackIcon'
import { orderService } from '../services/order'
import { formatGuests } from '../services/util.service'
import { PlatypusLoader } from '../cmps/PlatypusLoader'
import { LoginModal } from '../cmps/LoginModal.jsx'
import { ReservationSuccessModal } from '../cmps/ReservationSuccessModal'
import { StarIcon } from '../cmps/icons/StarIcon'
import { CreditCardIcon } from '../cmps/icons/CreditCardIcon.jsx'

export function StayCheckout() {
    const { stayId } = useParams()
    const navigate = useNavigate()
    const [stay, setStay] = useState(null)
    const user = useSelector((storeState) => storeState.userModule.user)
    const [isSuccessOpen, setIsSuccessOpen] = useState(false)

    const location = useLocation()
    const bookingState = location.state || {}
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    const { checkIn, checkOut, guests, nights, pricePerNight, totalPrice } = bookingState

    useEffect(() => {
        loadStay()
    }, [stayId])

    async function loadStay() {
        const stay = await stayService.getById(stayId)
        setStay(stay)
    }

    async function onConfirmBooking() {
        try {
            if (!user) {
                setIsLoginOpen(true)
                return
            }

            const order = orderService.getEmptyOrder()

            order.startDate = checkIn
            order.endDate = checkOut
            order.totalPrice = totalPrice
            order.guests = guests
            order.stay._id = stay._id
            order.stay.name = stay.name
            order.stay.price = pricePerNight
            order.stay.imgUrl = stay.imgUrls[0]

            // order.hostId = {
            //   _id: stay.host._id,
            //   fullname: stay.host.fullname || '',
            //   imgUrl: stay.host.imgUrl || ''
            // }

            order.hostId = {
                _id: 'LdZtJ',
                fullname: 'Maria Host',
                imgUrl: 'https://xsgames.co/randomusers/assets/avatars/female/2.jpg',
            }

            order.guest._id = user._id
            order.guest.fullname = user.fullname
            order.guest.imgUrl = 'https://randomuser.me/api/portraits/men/32.jpg'

            await orderService.save(order)
            setIsSuccessOpen(true)
        } catch (err) {
            console.error('Had issues booking:', err)
        }
    }

    if (!stay) return <PlatypusLoader size={72} />

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
                            <div className="payment-option">
                                <h2 className="payment-title">Add payment method</h2>
                                <div className="payment-header">
                                    <span className='payment-method-icon'>
                                        <CreditCardIcon /> Credit or debit card
                                    </span>
                                </div>
                                <input placeholder="Card number" defaultValue="4580 1234 5678 9012" />
                                <div className="payment-row">
                                    <input placeholder="Expiration" defaultValue="12/26" />
                                    <input placeholder="CVV" defaultValue="123" />
                                </div>
                                <input placeholder="ZIP code" defaultValue="6701201" />
                                <input placeholder="Israel" defaultValue="Israel" />
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
                                    <p>
                                        <StarIcon /> 4.94 · Superhost
                                    </p>
                                </div>
                            </div>

                            <div className="checkout-section">
                                <h3>Dates</h3>
                                <p>
                                    {checkIn && checkOut
                                        ? `${new Date(checkIn).toLocaleDateString(
                                              'en-GB'
                                          )} – ${new Date(checkOut).toLocaleDateString('en-GB')}`
                                        : 'Add dates'}
                                </p>
                            </div>

                            <div className="checkout-section">
                                <h3>Guests</h3>
                                <p>{guests ? formatGuests(guests) : 'Add guests'}</p>
                            </div>

                            <div className="checkout-section">
                                <h3>Price details</h3>
                                <div className="price-row">
                                    <span>
                                        {nights} nights × ${pricePerNight}
                                    </span>
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
                <ReservationSuccessModal
                    stay={stay}
                    bookingState={bookingState}
                    onClose={() => setIsSuccessOpen(false)}
                />
            )}

            {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
        </section>
    )
}
