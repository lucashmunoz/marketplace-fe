import axios from "axios";

axios.defaults.baseURL = "localhost:123123";
axios.defaults.timeout = 20000;
axios.defaults.headers.common = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export const endpoints = {
  items: "/items",
  payments: "/payments",
  orders: "/orders"
} as const;

export default axios;
