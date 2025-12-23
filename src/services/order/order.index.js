const { DEV, VITE_LOCAL } = import.meta.env

import { orderServiceLocal as local } from './order.service.local'
import { orderService as remote } from './order.service.remote'

function getEmptyOrder() {
    return {
        hostId: '',
        buyerId: '',
        totalPrice: 0,
        startDate: '',
        endDate: '',
        guests: {
            adults: 0,
            kids: 0,
            infants: 0,
            pets: 0,
        },
        stay: {
            _id: '',
            name: '',
            price: 0,
        },
        status: 'pending'
    }
}

const service = VITE_LOCAL === 'true' ? local : remote

export const orderService = { getEmptyOrder, ...service }

if (DEV) window.orderService = orderService
