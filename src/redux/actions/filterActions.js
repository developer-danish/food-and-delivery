import axios from "axios";
import { API_ENDPOINTS } from "../../api/constants";
import { getCookie } from "../../helpers/cookies";
import { GET_NEW_ARRIVALS } from "../constants/filterConstants";
import { GET_PRODUCTS } from "../constants/productConstants";
import { START_LOADING, STOP_LOADING } from "./../constants/loadingConstants";
import {
  SHOW_ERROR_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
} from "./../constants/messageConstants";

export const getNewArrivals =
  (sortBy = "desc", limit = 10) =>
  async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const response = await axios.get(
        `/api/filter?sortBy=${sortBy}&limit=${limit}`,
        {
          baseURL: API_ENDPOINTS.BASE_URL,
        }
      );
      dispatch({ type: STOP_LOADING });
      dispatch({ type: GET_NEW_ARRIVALS, payload: response.data.newArrivals });
    } catch (err) {
      console.log(err, "getNewArrivals error message");
      dispatch({ type: STOP_LOADING });
      dispatch({
        type: SHOW_ERROR_MESSAGE,
        payload: err.response.data.errorMessage,
      });
    }
  };

export const getProductsByFilter = (arg) => async (dispatch) => {
  const token = await getCookie("token");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      baseURL: API_ENDPOINTS.BASE_URL,
    };
    const response = await axios.post(
      "/api/filter/search",
      {
        ...arg,
      },
      config
    );
    dispatch({ type: GET_PRODUCTS, payload: response.data.products });
  } catch (err) {
    console.log(err, "getProductsByFilter error message");
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.response.data.errorMessage,
    });
  }
};
