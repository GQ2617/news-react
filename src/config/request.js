import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

const request = axios.create({
  baseURL: "http://81.70.5.237:3000",
  // baseURL: "http://127.0.0.1:3000",
  timeout: 5000,
});

request.interceptors.request.use((config) => {
  nProgress.start();
  return config;
});

request.interceptors.response.use((res) => {
  nProgress.done();
  return res;
});

export default request;
