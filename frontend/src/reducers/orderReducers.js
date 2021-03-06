import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_MY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.data,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.data,
      };
    default:
      return {
        state,
      };
  }
};

export const detailsOrderReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.data,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.data,
      };
    default:
      return {
        state,
      };
  }
};

export const payOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.data,
      };
    case ORDER_PAY_RESET:
      return {
        state: {},
      };
    default:
      return {
        ...state,
      };
  }
};

export const listMyOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.data,
      };
    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.data,
      };
    case ORDER_LIST_MY_RESET:
      return {
        orders: [],
      };
    default:
      return {
        state,
      };
  }
};
