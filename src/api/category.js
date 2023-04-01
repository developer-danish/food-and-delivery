import axios from "axios";
import { getCookie } from "../helpers/cookies";
export const createCategory = async (data) => {
  const token = await getCookie("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    baseURL: "https://food-order-b6n5.onrender.com",
  };
  const response = await axios.post("/api/category", data, config);
  return response;
};

export const readCategory = async () => {
  const response = await axios.get("/api/category", {
    baseURL: "https://food-order-b6n5.onrender.com",
  });
  return response;
};
