import axios from "axios";

const baseURL = import.meta.env.MODE === "development" ? import.meta.env.VITE_API_BASE_URL : ""; // production: same origin

const client = axios.create({
  baseURL,
  timeout: 15000,
});

export default client;
