const { DEV, VITE_LOCAL } = import.meta.env


import { stayService as local } from './stay.service.local'
import { stayService as remote } from './stay.service.remote'

export function getEmptyStay() {
    return {
        name: '',
        type: '',
        imgUrls: [],
        price: 0,
        summary: '',
        capacity: 1,
        amenities: [],
        labels: [],
        host: {},
        createdAt: new Date(),
        loc: {
            country: '',
            city: '',
            address: '',
            lat: 0,
            lng: 0,
        },
        reviews: [],
        likedByUsers: []
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        loc: '',
        checkIn: null,
        checkOut: null,
        minPrice: 0,
        maxPrice: 0,
        guests: 0,
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0
    }
}

const service = (VITE_LOCAL === 'true') ? local : remote
export const stayService = { getEmptyStay, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.stayService = stayService