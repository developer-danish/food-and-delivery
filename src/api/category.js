import axios from "axios";
import { getCookie } from "../helpers/cookies";
import { API_ENDPOINTS } from "./constants";
export const createCategory = async (data) => {
  const token = await getCookie("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    baseURL: API_ENDPOINTS.BASE_URL,
  };
  const response = await axios.post("/api/category", data, config);
  return response;
};

export const readCategory = async () => {
  const response = await axios.get("/api/category", {
    baseURL: API_ENDPOINTS.BASE_URL,
  });
  return response;
};
