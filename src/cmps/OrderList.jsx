import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders } from '../store/actions/order.actions'
import { OrderPreview } from './OrderPreview'
import { PlatypusLoader } from './PlatypusLoader'

export function OrderList({}) {
    const [isLoading, setIsLoading] = useState(true)
    const loggedInUser = useSelector((state) => state.userModule.user)
    const orders = useSelector(
        (state) =>
            state.orderModule.orders.filter((order) => order.hostId._id === loggedInUser?._id)
    )

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
    return (
        <div className="orders-table">
            <table>
                <thead>
                    <tr>
                        <th>Guest</th>
                        <th>Check-In</th>
                        <th>Check-Out</th>
                        <th>Book date</th>
                        <th>Listing</th>
                        <th>Total price</th>
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
    )
}
