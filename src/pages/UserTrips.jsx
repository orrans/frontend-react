import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { orderService } from '../services/order'

export function UserTrips() {
    const [orders, setOrders] = useState([])
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) loadOrders()
    }, [user])

    async function loadOrders() {
        try {
            const filterBy = { buyerId: user._id }
            const userOrders = await orderService.query(filterBy)
            setOrders(userOrders)
        } catch (err) {
            console.error('Cannot load orders', err)
        }
    }

    if (!orders.length) return (
        <section className="trips-empty main-container">
            <h1>No trips booked... yet!</h1>
            <button className="airbnb-btn-pink" onClick={() => navigate('/')}>
                Start searching
            </button>
        </section>
    )

    return (
        <section className="user-trips-page main-container">
            <h1 className="page-title">My Trips</h1>
            
            <div className="orders-list">
                {orders.map(order => (
                    <div key={order._id} className="trip-row-wrapper">
                        <div className="trip-row">
                            <div className="img-container">
                                <img src={order.stay.imgUrl} alt={order.stay.name} />
                            </div>
                            
                            <div className="trip-details">
                                <div className="info-main">
                                    <h3>{order.stay.name}</h3>
                                    <p className="dates">
                                        {new Date(order.startDate).toLocaleDateString('en-GB')} – {new Date(order.endDate).toLocaleDateString('en-GB')}
                                    </p>
                                </div>
                                
                                <div className="status-indicator">
                                    <span className={`status-label ${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <hr className="row-divider" />
                    </div>
                ))}
            </div>

            <button className="back-home-btn airbnb-btn-pink" onClick={() => navigate('/')}>
                Look for more places to stay
            </button>
        </section>
    )
}