import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { updateOrderStatus } from '../store/actions/order.actions'
import { format } from 'date-fns'
import { formatPrice } from '../services/util.service'

export function OrderPreview({ order }) {
    const dateFormat = 'dd/MM/yyyy'
    const isPending = order.status.toLowerCase() === 'pending'

    function handleAccept() {
        updateOrderStatus(order._id, 'approved')
    }

    function handleReject() {
        updateOrderStatus(order._id, 'rejected')
    }

    return (
        <tr className="order-row">
            <td>
                <div className="order-row-guest">
                    <img src={order.guest.imgUrl} /> {order.guest.fullname}
                </div>
            </td>
            <td>{format(new Date(order.startDate), dateFormat)}</td>
            <td>{format(new Date(order.endDate), dateFormat)}</td>
            <td>{format(new Date(order.bookDate), dateFormat)}</td>
            <td>{order.stay.name}</td>
            <td>{formatPrice(order.stay.price)}</td>
            <td className={order.status.toLowerCase()}>{order.status}</td>
            <td>
                <div className="order-row-actions">
                    <button className='accept-btn' onClick={handleAccept} disabled={!isPending}>Approve</button>
                    <button className='reject-btn' onClick={handleReject} disabled={!isPending}>Reject</button>
                </div>
            </td>
        </tr>
    )
}
