export const SET_ORDERS = 'SET_ORDERS'
export const ADD_ORDER = 'ADD_ORDER'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const SET_USER_ORDERS = 'SET_USER_ORDERS'
export const SET_HOST_ORDERS = 'SET_HOST_ORDERS'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'

const initialState = {
    orders: [],
    userOrders: [],
    hostOrders: [],
}

export function orderReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_ORDERS:
            return { ...state, orders: action.orders }
        case ADD_ORDER:
            return { ...state, orders: [...state.orders, action.order] }
        case UPDATE_ORDER:
            return {
                ...state,
                orders: state.orders.map((order) =>
                    order._id === action.order._id ? action.order : order
                ),
                userOrders: state.userOrders.map((order) =>
                    order._id === action.order._id ? action.order : order
                ),
                hostOrders: state.hostOrders.map((order) =>
                    order._id === action.order._id ? action.order : order
                ),
            }
        case UPDATE_ORDER_STATUS:
            return {
                ...state,
                orders: state.orders.map((order) =>
                    order._id === action.order._id ? { ...order, status: action.order.status } : order
                ),
                userOrders: state.userOrders.map((order) =>
                    order._id === action.order._id ? { ...order, status: action.order.status } : order
                ),
                hostOrders: state.hostOrders.map((order) =>
                    order._id === action.order._id ? { ...order, status: action.order.status } : order
                ),
            }
        case REMOVE_ORDER:
            return {
                ...state,
                orders: state.orders.filter((order) => order._id !== action.orderId),
            }
        case SET_USER_ORDERS:
            return { ...state, userOrders: action.orders }
        case SET_HOST_ORDERS:
            return { ...state, hostOrders: action.orders }
        default:
            return state
    }
}
