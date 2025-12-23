import { storageService } from '../async-storage.service'
import orderData from '../../assets/data/order.json'
const STORAGE_KEY = 'order'

createOrders()

export const orderServiceLocal = {
    save,
    query,
    remove,
    getUserOrders,
    getHostOrders,
}
async function query(filterBy = {}) {
    let orders = await storageService.query(STORAGE_KEY)

    if (filterBy.hostId) {
        orders = orders.filter((order) => order.host._id === filterBy.hostId)
    }

    if (filterBy.guestId) {
        orders = orders.filter((order) => order.guest._id === filterBy.guestId)
    }

    if (filterBy.status) {
        orders = orders.filter((order) => order.status === filterBy.status)
    }

    if (filterBy.stayId) {
        orders = orders.filter((order) => order.stay._id === filterBy.stayId)
    }

    return orders
}

function save(order) {
    if (order._id) {
        return storageService.put(STORAGE_KEY, order)
    } else {
        return storageService.post(STORAGE_KEY, order)
    }
}

function remove(orderId) {
    return storageService.remove(STORAGE_KEY, orderId)
}

async function getUserOrders(userId) {
    const orders = await storageService.query(STORAGE_KEY)
    return orders.filter((order) => order.guest._id === userId)
}

async function getHostOrders(hostId) {
    const orders = await storageService.query(STORAGE_KEY)
    return orders.filter((order) => order.host._id === hostId)
}

async function createOrders() {
    var orders = await storageService.query(STORAGE_KEY)
    if (!orders || !orders.length) {
        console.log('Creating orders from JSON data:', orderData)
        for (const order of orderData) {
            await storageService.post(STORAGE_KEY, order)
        }
    }
}
