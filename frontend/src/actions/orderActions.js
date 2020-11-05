import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from '../constants/orderConstants';
import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        console.log('Working');
        console.log('ORDER ACTION: ORDER --> ', order);

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        console.log('Before API rerquest');

        const { data } = await axios.post(`/api/orders`, order, config);

        console.log('After API rerquest');


        console.log('ORDER ACTION: DATA ---> ',data);
    
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            data
        })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            data:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
    }
}