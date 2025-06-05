import axios from "axios";

const axiosIntance = axios.create({
  baseURL:
    import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",
  withCredentials: true, //send cookie to the server
});

export default axiosIntance;
