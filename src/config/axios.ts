import axios from "axios";
import { store } from "~/app/store";
const API_URL = import.meta.env.VITE_API_URL;
export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers : {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${localStorage.getItem('token') || ""}`
  }
});
export default axiosInstance;