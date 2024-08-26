import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: "https://ecommerce.routemisr.com",
});

axiosConfig.defaults.headers.common["token"] = localStorage.getItem("token");

export default axiosConfig;

