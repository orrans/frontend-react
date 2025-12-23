import { orderService } from '../../services/order/order.index.js'
import { store } from '../store'
import {
    ADD_ORDER,
    REMOVE_ORDER,
    SET_ORDERS,
    SET_USER_ORDERS,
    SET_HOST_ORDERS,
    UPDATE_ORDER,
} from '../reducers/order.reducer.js'

function handleError(actionName, err) {
    console.error(`OrderActions: Error in ${actionName}`, err)
    throw err
}

export async function addOrder(order) {
    try {
        const addedOrder = await orderService.save(order)
        store.dispatch(getCmdAddOrder(addedOrder))
        return addedOrder
    } catch (err) {
        handleError('addOrder', err)
    }
}

export async function updateOrder(order) {
    try {
        const updatedOrder = await orderService.save(order)
        store.dispatch(getCmdUpdateOrder(updatedOrder))
        return updatedOrder
    } catch (err) {
        handleError('updateOrder', err)
    }
}

export async function removeOrder(orderId) {
    try {
        await orderService.remove(orderId)
        store.dispatch(getCmdRemoveOrder(orderId))
    } catch (err) {
        handleError('removeOrder', err)
    }
}

export async function loadOrders(filterBy = {}) {
    try {
        const orders = await orderService.query(filterBy)
        store.dispatch(getCmdSetOrders(orders))
        return orders
    } catch (err) {
        handleError('loadOrders', err)
    }
}

export async function loadUserOrders(userId) {
    try {
        const userOrders = await orderService.getUserOrders(userId)
        store.dispatch(getCmdSetUserOrders(userOrders))
        return userOrders
    } catch (err) {
        handleError('loadUserOrders', err)
    }
}

export async function loadHostOrders(hostId) {
    try {
        const hostOrders = await orderService.getHostOrders(hostId)
        store.dispatch(getCmdSetHostOrders(hostOrders))
        return hostOrders
    } catch (err) {
        handleError('loadHostOrders', err)
    }
}

// Command Creators:
function getCmdSetOrders(orders) {
    return {
        type: SET_ORDERS,
        orders,
    }
}

function getCmdSetUserOrders(orders) {
    return {
        type: SET_USER_ORDERS,
        orders,
    }
}

function getCmdSetHostOrders(orders) {
    return {
        type: SET_HOST_ORDERS,
        orders,
    }
}

function getCmdAddOrder(order) {
    return {
        type: ADD_ORDER,
        order,
    }
}

function getCmdUpdateOrder(order) {
    return {
        type: UPDATE_ORDER,
        order,
    }
}

function getCmdRemoveOrder(orderId) {
    return {
        type: REMOVE_ORDER,
        orderId,
    }
}
