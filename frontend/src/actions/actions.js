import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../constants/constants";
import axios from "axios";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/products");

    dispatch({ type: PRODUCT_LIST_SUCCESS, data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      data:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};