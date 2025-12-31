import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadUserOrders } from '../store/actions/order.actions'
import { SpecialBtn } from '../cmps/SpecialBtn'


export function UserTrips() {
    const orders = useSelector(storeState => storeState.orderModule.userOrders)
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            loadUserOrders(user._id)
        }
    }, [user])

useEffect(() => {
  document.body.classList.add('hide-collapsed-search')

  return () => {
    document.body.classList.remove('hide-collapsed-search')
  }
}, [])


    const sortedOrders = orders?.slice().sort((a, b) => {
        const dateA = new Date(a.bookDate || a.createdAt).getTime()
        const dateB = new Date(b.bookDate || b.createdAt).getTime()
        return dateB - dateA
    }) || []



    if (!sortedOrders.length) return (
        <section className="user-trips-page main-container">
            <h1 className="page-title">Trips</h1>

            <div className="trips-empty">
                <div className="empty-img-container">
                    <img src="/img/noTrips.png" alt="Build your trip" />
                </div>

                <div className="empty-state-content">
                    <h2>Build the perfect trip</h2>
                    <p>Explore homes, experiences, and services. When you book, your reservations will show up here.</p>
                    <button className="airbnb-btn-pink" onClick={() => navigate('/')}>
                        Get started
                    </button>
                </div>
            </div>
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

                                    {/* <span className={`status-label ${order.status.toLowerCase()}`}>
                                        {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                                    </span> */}
                                </div>
                            </div>
                        </div>
                        <hr className="row-divider" />
                    </div>
                ))}
            </div>

            <SpecialBtn txt="Look for more places to stay" onClick={() => navigate('/')} />

        </section>
    )
}