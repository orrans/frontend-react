const { DEV, VITE_LOCAL } = import.meta.env

import { orderServiceLocal as local } from './order.service.local'
import { orderService as remote } from './order.service.remote'

// index.js

function getEmptyOrder() {
    return {
        _id: '',
        hostId: {
            _id: '',
            fullname: '',
            imgUrl: '',
        },
        guest: {
            _id: '',
            fullname: '',
        },
        totalPrice: 0,
        startDate: '',
        endDate: '',
        bookDate: new Date(),
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
            imgUrl: '',
        },
        msgs: [],
        status: 'pending',
    }
}

const service = VITE_LOCAL === 'true' ? local : remote

export const orderService = { getEmptyOrder, ...service }

if (DEV) window.orderService = orderService

if (process.env.NODE_ENV !== 'production') {
    window.store = store
}
