import axios from "axios";
export const addNewFood = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: "https://food-order-b6n5.onrender.com",
  };
  const response = await axios.post("/api/food", data, config);
  return response;
};
