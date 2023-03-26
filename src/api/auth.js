import axios from "axios";
export const signup = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: "https://food-order-b6n5.onrender.com",
  };
  const response = await axios.post("/api/auth/signup", data, config);
  return response;
};

export const signin = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: "https://food-order-b6n5.onrender.com",
  };
  const response = await axios.post("/api/auth/signin", data, config);
  return response;
};
