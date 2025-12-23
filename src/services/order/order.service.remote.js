import { httpService } from '../http.service'

export const orderService = {
    save,
    query,
    remove,
    getUserOrders,
    getHostOrders,
}

function query(filterBy = {}) {
    const queryStr = Object.keys(filterBy)
        .map((key) => `${key}=${filterBy[key]}`)
        .join('&')
    return httpService.get(`order?${queryStr}`)
}

async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await httpService.put(`order/${order._id}`, order)
    } else {
        savedOrder = await httpService.post('order', order)
    }
    return savedOrder
}

function remove(orderId) {
    return httpService.delete(`order/${orderId}`)
}

function getHostOrders(hostId) {
    return httpService.get(`order/${hostId}/host-orders`)
}

function getUserOrders(userId) {
    return httpService.get(`order/${userId}/user-orders`)
}
