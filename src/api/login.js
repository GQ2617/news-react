import request from "../config/request";

// 1. 登录
export const reqLogin = (data) =>
  request({ url: "/api/login", method: "POST", data });
