import axios from "axios";

const url = import.meta.env.VITE_SERVER_URL;

const instance = axios.create({
  baseURL: `${url}/`,
});

export { instance };
