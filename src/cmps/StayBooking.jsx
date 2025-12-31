import { useNavigate } from 'react-router-dom'
import { SpecialBtn } from '../cmps/SpecialBtn'


export function StayBooking({ stay, checkIn, checkOut, guests, nights, totalPrice, pricePerNight, getGuestsText }) {
    const navigate = useNavigate()

    return (
        <aside className="stay-booking">
            <div className="booking-sticky">
                <div className="booking-card">
                    <div className="booking-price">
                        {!nights ? (
                            <span className="price-placeholder">Add dates for prices</span>
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
                                    {checkIn ? new Date(checkIn).toLocaleDateString('en-GB') : 'Add date'}
                                </span>
                            </div>
                            <div>
                                <label>CHECKOUT</label>
                                <span>
                                    {checkOut ? new Date(checkOut).toLocaleDateString('en-GB') : 'Add date'}
                                </span>
                            </div>
                        </div>

                        <div className="booking-guests">
                            <label>GUESTS</label>
                            <span>{getGuestsText(guests)}</span>
                        </div>
                    </div>

                    

                    <SpecialBtn txt="Reserve" onClick={() =>
                        navigate(`/stay/${stay._id}/checkout`, {
                            state: { checkIn, checkOut, guests, nights, pricePerNight, totalPrice }
                        })}
                        
                    />

                    <p className="booking-note">You won’t be charged yet</p>
                </div>
            </div>
        </aside>
    )
}