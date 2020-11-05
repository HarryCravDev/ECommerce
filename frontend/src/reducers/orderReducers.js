import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from '../constants/orderConstants';

export const createOrderReducer = (state = {}, action) => {
    console.log('ORDER REDUCER: ', action.data);
    switch(action.type) {
        case ORDER_CREATE_REQUEST: 
        return {
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