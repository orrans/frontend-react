import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { updateOrderStatus } from '../store/actions/order.actions'
import { format } from 'date-fns'
import { formatPrice } from '../services/util.service'
import { SpecialBtn } from './SpecialBtn.jsx'

export function OrderPreviewCard({ order }) {
    const dateFormat = 'dd/MM/yyyy'
    const isPending = order.status.toLowerCase() === 'pending'
    const [isOpen, setIsOpen] = useState(false)

    function handleAccept(ev) {
        ev.stopPropagation()
        updateOrderStatus(order._id, 'approved')
    }

    function handleReject(ev) {
        ev.stopPropagation()
        updateOrderStatus(order._id, 'rejected')
    }

    return (
        <div className="order-card" onClick={() => setIsOpen((prev) => !prev)}>
            <div className="card-guest">
                <img src={order.guest.imgUrl} />
                <div className="guest-title-data">
                    <span>{order.guest.fullname}</span>
                    {!isOpen && <span className={order.status.toLowerCase()}>{order.status}</span>}
                </div>
            </div>
            <div className="card-data">
                <b>Listing:</b>
                {order.stay.name}
            </div>
            {isOpen && (
                <div>
                    <div className="card-data">
                        <b>Check-in:</b>
                        {order.startDate ? format(new Date(order.startDate), dateFormat) : '-'}
                    </div>
                    <div className="card-data">
                        <b>Check-out:</b>
                        {order.endDate ? format(new Date(order.endDate), dateFormat) : '-'}
                    </div>
                    <div className="card-data">
                        <b>Booked at:</b>
                        {order.bookDate ? format(new Date(order.bookDate), dateFormat) : '-'}
                    </div>
                    <div className="card-data">
                        <b>Status:</b>
                        <span className={order.status.toLowerCase()}>{order.status}</span>
                    </div>
                    <div className="card-data">
                        <b>Total price:</b>
                        {formatPrice(order.stay.price)}
                    </div>
                    <div>
                        <div className="order-card-actions">
                            <SpecialBtn
                                txt={'Approve'}
                                onClick={handleAccept}
                                disabled={!isPending}
                            />
                            <button
                                className="reject-btn"
                                onClick={handleReject}
                                disabled={!isPending}>
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
