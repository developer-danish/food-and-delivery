import axios from "axios";
import { getCookie } from "../helpers/cookies";
export const addNewFood = async (data) => {
  const token = await getCookie("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    baseURL: "https://food-order-b6n5.onrender.com",
  };
  const response = await axios.post("/api/food", data, config);
  return response;
};
