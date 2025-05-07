import axios from "axios";

axios.defaults.timeout = 20000;
axios.defaults.headers.common = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export const endpoints = {
  items: "http://18.211.161.158:8080/items",
  placeOrder: "http://34.202.179.140:8080/orders",
  purchases: "http://3.230.17.15:8080/payments"
} as const;

export default axios;
