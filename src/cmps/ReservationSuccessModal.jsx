import { useNavigate } from 'react-router-dom'
import { formatGuests } from '../services/util.service'

export function ReservationSuccessModal({ stay, bookingState, onClose }) {
    const navigate = useNavigate()

    const {
        checkIn,
        checkOut,
        guests,
        nights,
        pricePerNight,
        totalPrice
    } = bookingState

    return (
        <div className="modal-overlay">
            <div className="success-modal reservation-success-modal">
                <header className="modal-header">
                    <div className="success-icon">✓</div>
                    <h2>Reserved successfully</h2>
                </header>

                <p className="modal-subtitle">
                    You can follow the order status in <span onClick={() => navigate('/trips')}>My trips</span> page
                </p>

                <div className="reservation-content">
                    <div className="reservation-details">
                        <h3 className="main-title">Reservation details</h3>

                        <div className="detail-item">
                            <span className="detail-label">Trip dates</span>
                            <p className="detail-value">
                                {new Date(checkIn).toLocaleDateString('en-GB')} - {new Date(checkOut).toLocaleDateString('en-GB')}
                            </p>
                        </div>

                        <div className="detail-item">
                            <span className="detail-label">Guests</span>
                            <p className="detail-value">{formatGuests(guests)}</p>
                        </div>

                        <div className="detail-item price-details-section">
                            <hr className="modal-divider" />
                            <span className="detail-label">Price Details</span>
                            <div className="price-line">
                                <span className="detail-value">${pricePerNight} x {nights} nights</span>
                                <span className="detail-value">${totalPrice}</span>
                            </div>
                            <div className="price-line">
                                <span className="detail-value">Service fee</span>
                                <span className="detail-value">$0</span>
                            </div>

                            <div className="price-total-line">
                                <span className="detail-label">Total</span>
                                <span className="detail-label">${totalPrice}</span>
                            </div>
                        </div>
                    </div>

                    <div className="reservation-preview-img">
                        <img src={stay.imgUrls[0]} alt={stay.name} />
                        <div className="img-caption">
                            <h4>{stay.name}</h4>
                            <p>{stay.loc.city}, {stay.loc.country}</p>
                        </div>
                    </div>
                </div>

                <button className="close-modal-btn" onClick={() => {
                    onClose()
                    navigate('/trips')
                }}>
                    Close
                </button>
            </div>
        </div>
    )
}