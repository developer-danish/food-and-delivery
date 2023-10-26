import axios from "axios";
import { getCookie } from "../helpers/cookies";
import { API_ENDPOINTS } from "./constants";
export const addNewFood = async (data) => {
  const token = await getCookie("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    baseURL: API_ENDPOINTS.BASE_URL,
  };
  const response = await axios.post("/api/food", data, config);
  return response;
};

export const addLeftOverFood = async (data) => {
  // const token = await getCookie("token");
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: token,
  //   },
  //   baseURL: API_ENDPOINTS.BASE_URL,
  // };
  const response = await axios.post("/api/leftoverfood", data);
  return response;
};
