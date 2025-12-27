import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { orderService } from '../services/order'

export function UserTrips() {
    const [orders, setOrders] = useState([])
    const user = useSelector(storeState => storeState.userModule.user)

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
        <section className="trips-empty">
            <h1>No trips booked... yet!</h1>
            <p>Time to dust off your bags and start planning your next adventure.</p>
            <button onClick={() => navigate('/')}>Start searching</button>
        </section>
    )

    return (
        <section className="user-trips-page">
            <h1>Trips</h1>
            <div className="orders-list">
                {orders.map(order => (
                    <div key={order._id} className="trip-card">
                        <img src={order.stay.imgUrl} alt={order.stay.name} />
                        <div className="trip-info">
                            <h3>{order.stay.name}</h3>
                            <p>{new Date(order.startDate).toLocaleDateString()} - {new Date(order.endDate).toLocaleDateString()}</p>
                            <span className={`status-label ${order.status}`}>
                                {order.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}