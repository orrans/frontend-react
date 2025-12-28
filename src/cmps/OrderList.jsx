import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders } from '../store/actions/order.actions'
import { OrderPreview } from './OrderPreview'
import { PlatypusLoader } from './PlatypusLoader'
import { DashboardAnalytics } from './DashboardAnalytics'
import { useIsMobile } from '../customHooks/useIsMobile'
import { OrderPreviewCard } from './OrderPreviewCard'

export function OrderList() {
    const [isLoading, setIsLoading] = useState(true)
    const loggedInUser = useSelector((state) => state.userModule.user)
    const orders = useSelector((state) =>
        state.orderModule.orders
            .filter((order) => order.hostId._id === loggedInUser?._id)
            .sort((a, b) => new Date(b.bookDate) - new Date(a.bookDate))
    )
    const isMobile = useIsMobile()

    useEffect(() => {
        const loadData = async () => {
            await loadOrders()
            setIsLoading(false)
        }
        loadData()
    }, [])

    useEffect(() => {
        if (orders.length > 0 && isLoading) {
            setIsLoading(false)
        }
    }, [orders.length])

    if (isLoading) return <PlatypusLoader />
    if (!orders.length) return <div>No orders found</div>

    if (isMobile) {
        return (
            <div className="order-list-container">
                <h3 className="order-count-card">{orders.length} reservations</h3>
                {orders.map((order) => (
                    <OrderPreviewCard key={order._id} order={order} />
                ))}
            </div>
        )
    }
    return (
        <div className="order-list-container">
            <h3 className="order-count">{orders.length} reservations</h3>

            <div className="orders-table">
                <table>
                    <thead>
                        <tr>
                            <th>Guest</th>
                            <th>Check-In</th>
                            <th>Check-Out</th>
                            <th>Booked</th>
                            <th>Listing</th>
                            <th>Total Payout</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <OrderPreview key={order._id} order={order} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
