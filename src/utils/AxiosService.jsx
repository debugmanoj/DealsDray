import axios from "axios";
const API_URL = "https://dealsdray-be.onrender.com/";

const AxiosService = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosService