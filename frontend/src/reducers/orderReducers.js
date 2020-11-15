import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from '../constants/orderConstants';

export const createOrderReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_CREATE_REQUEST: 
        return {
            ...state,
            loading: true
        }
        case ORDER_CREATE_SUCCESS: 
        return {
            loading: false,
            success: true,
            order: action.data
        }
        case ORDER_CREATE_FAIL: 
        return {
            loading: false,
            error: action.data
        }
        default:
            return {
                state
            }
    }
} 

export const detailsOrderReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch(action.type) {
        case ORDER_DETAILS_REQUEST: 
        return {
            ...state,
            loading: true
        }
        case ORDER_DETAILS_SUCCESS: 
        return {
            loading: false,
            order: action.data
        }
        case ORDER_DETAILS_FAIL: 
        return {
            loading: false,
            error: action.data
        }
        default:
            return {
                state
            }
    }
} 