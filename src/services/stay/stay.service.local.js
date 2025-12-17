
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    addStayMsg
}
window.cs = stayService



async function query(filterBy = { txt: '', price: 0 }) {
    var stays = await storageService.query(STORAGE_KEY)

    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stays = stays.filter(stay =>
            regex.test(stay.name) ||
            regex.test(stay.summary) ||
            regex.test(stay.loc.city) ||
            regex.test(stay.loc.country)
        )
    }

    return stays
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
    await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await storageService.put(STORAGE_KEY, stay)
    } else {
        const stayToSave = {
            ...stay,
            imgUrls: stay.imgUrls && stay.imgUrls.length ? stay.imgUrls : [],
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedStay = await storageService.post(STORAGE_KEY, stayToSave)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    const stay = await getById(stayId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    stay.msgs.push(msg)
    await storageService.put(STORAGE_KEY, stay)

    return msg
}

function _createStays() {
    let stays = localStorage.getItem(STORAGE_KEY)

    if (!stays || stays === '[]' || stays === 'null') {
        stays = demoStays
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stays))
    }
}

// Demo data - Moved to an array to support multiple demo items
const demoStays = [
    {
        _id: 's101',
        name: 'Ribeira Charming Duplex',
        type: 'House',
        imgUrls: [
            'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
            'otherImg.jpg',
        ],
        price: 80.0,
        summary: 'Fantastic duplex apartment...',
        capacity: 8,
        amenities: ['TV', 'Wifi', 'Kitchen', 'Smoking allowed', 'Pets allowed', 'Cooking basics'],
        labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
        host: {
            _id: 'u101',
            fullname: 'Davit Pok',
            imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
        },
        loc: {
            country: 'Portugal',
            countryCode: 'PT',
            city: 'Lisbon',
            address: '17 Kombo st',
            lat: -8.61308,
            lng: 41.1413,
        },
        reviews: [
            {
                id: 'madeId',
                txt: 'Very helpful hosts. Cooked traditional...',
                rate: 4,
                by: {
                    _id: 'u102',
                    fullname: 'user2',
                    imgUrl: '/img/img2.jpg',
                },
            },
        ],
        likedByUsers: ['mini-user'],
    },
    {
        _id: 's102',
        name: 'Modern Sea View Apartment',
        type: 'Apartment',
        imgUrls: [
            'https://cdn.pixabay.com/photo/2019/08/19/13/58/bed-4416515_1280.jpg',
            'otherImg.jpg',
        ],
        price: 120.0,
        summary: 'Bright modern apartment with a stunning sea view.',
        capacity: 4,
        amenities: ['TV', 'Wifi', 'Air conditioning', 'Kitchen', 'Elevator'],
        labels: ['Trending', 'Sea view', 'Romantic'],
        host: {
            _id: 'u102',
            fullname: 'Maria Silva',
            imgUrl: 'https://a0.muscache.com/im/pictures/8a4f3a5d-2c4d-4c91-bf43-8c7e9a5c3d2f.jpg?aki_policy=profile_small',
        },
        loc: {
            country: 'Spain',
            countryCode: 'ES',
            city: 'Barcelona',
            address: '22 Marina Blvd',
            lat: 2.1734,
            lng: 41.3851,
        },
        reviews: [],
        likedByUsers: ['mini-user', 'user2'],
    },
    {
        _id: 's103',
        name: 'Cozy Mountain Cabin',
        type: 'Cabin',
        imgUrls: [
            'https://cdn.pixabay.com/photo/2012/11/21/10/24/building-66789_960_720.jpg',
            'otherImg.jpg',
        ],
        price: 95.0,
        summary: 'Quiet wooden cabin surrounded by nature.',
        capacity: 6,
        amenities: ['Fireplace', 'Wifi', 'Kitchen', 'Free parking'],
        labels: ['Nature', 'Relax', 'Mountain'],
        host: {
            _id: 'u103',
            fullname: 'Jonas Berg',
            imgUrl: 'https://a0.muscache.com/im/pictures/2f6b3a7d-5c1e-4b8a-b9f2-1e3a7d5c9b8f.jpg?aki_policy=profile_small',
        },
        loc: {
            country: 'Norway',
            countryCode: 'NO',
            city: 'Flåm',
            address: '8 Pine Tree Rd',
            lat: 7.1149,
            lng: 60.8608,
        },
        reviews: [],
        likedByUsers: [],
    },
    {
        _id: 's104',
        name: 'Urban Loft Studio',
        type: 'Loft',
        imgUrls: [
            'https://cdn.pixabay.com/photo/2019/08/19/13/58/bed-4416515_1280.jpg',
            'otherImg.jpg',
        ],
        price: 110.0,
        summary: 'Stylish loft in the heart of the city.',
        capacity: 2,
        amenities: ['Wifi', 'Kitchen', 'Washer', 'Dryer'],
        labels: ['City', 'Design', 'Business'],
        host: {
            _id: 'u104',
            fullname: 'Alex Johnson',
            imgUrl: 'https://a0.muscache.com/im/pictures/6a7c5b9d-3e4a-4f8c-9b2a-1d5e6c7a8b9f.jpg?aki_policy=profile_small',
        },
        loc: {
            country: 'USA',
            countryCode: 'US',
            city: 'New York',
            address: '45 Spring St',
            lat: -74.006,
            lng: 40.7128,
        },
        reviews: [],
        likedByUsers: ['mini-user'],
    },
    {
        _id: 's105',
        name: 'Desert Eco Lodge',
        type: 'Lodge',
        imgUrls: [
            'https://cdn.pixabay.com/photo/2019/08/19/13/58/bed-4416515_1280.jpg',
            'otherImg.jpg',
        ],
        price: 70.0,
        summary: 'Eco friendly lodge with breathtaking desert views.',
        capacity: 5,
        amenities: ['Kitchen', 'Free parking', 'Outdoor shower'],
        labels: ['Eco', 'Adventure', 'Unique'],
        host: {
            _id: 'u105',
            fullname: 'Noa Levi',
            imgUrl: 'https://a0.muscache.com/im/pictures/1c9a7e5b-3d6f-4b8a-9e2c-5a6d7b8c9f1e.jpg?aki_policy=profile_small',
        },
        loc: {
            country: 'Israel',
            countryCode: 'IL',
            city: 'Mitzpe Ramon',
            address: 'Desert Route 40',
            lat: 34.8019,
            lng: 30.6106,
        },
        reviews: [],
        likedByUsers: [],
    },
    {
        _id: 's106',
        name: 'Tropical Garden Villa',
        type: 'Villa',
        imgUrls: [
            'https://cdn.pixabay.com/photo/2019/08/19/13/58/bed-4416515_1280.jpg',
            'otherImg.jpg',
        ],
        price: 180.0,
        summary: 'Private villa with pool and lush tropical garden.',
        capacity: 10,
        amenities: ['Pool', 'Wifi', 'Kitchen', 'Air conditioning', 'Free parking'],
        labels: ['Luxury', 'Tropical', 'Family'],
        host: {
            _id: 'u106',
            fullname: 'Suri Tan',
            imgUrl: 'https://a0.muscache.com/im/pictures/8e7a5c3d-9b6f-4c1a-a2e3-5d7c8b9f1e6a.jpg?aki_policy=profile_small',
        },
        loc: {
            country: 'Thailand',
            countryCode: 'TH',
            city: 'Phuket',
            address: '12 Palm Grove',
            lat: 98.3381,
            lng: 7.8804,
        },
        reviews: [],
        likedByUsers: ['user3'],
    },
]

_createStays()