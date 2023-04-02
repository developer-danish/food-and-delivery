import axios from "axios";
import { API_ENDPOINTS } from "./constants";
export const signup = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: API_ENDPOINTS.BASE_URL,
  };
  const response = await axios.post("/api/auth/signup", data, config);
  return response;
};

export const signin = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: API_ENDPOINTS.BASE_URL,
  };
  const response = await axios.post("/api/auth/signin", data, config);
  return response;
};
