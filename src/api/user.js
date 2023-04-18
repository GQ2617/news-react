import request from "../config/request";

// 1. 获取用户列表
export const reqGetUserList = () =>
  request({ url: "/api/getuser", method: "GET" });

// 2. 添加用户
export const reqAddUser = (data) =>
  request({ url: "/api/reguser", method: "POST", data });

// 3. 删除用户
export const reqDelUser = (id) =>
  request({ url: `/api/deleteuser/${id}`, method: "DELETE" });

// 4. 修改用户信息
export const reqUpdateUserInfo = (data) =>
  request({ url: `/api/updateuser`, method: "POST", data });

// 5. 修改用户状态
export const reqUpdateUserState = (data) =>
  request({ url: `/api/updatestate`, method: "POST", data });

// 6. 获取角色列表
export const reqGetRoleList = () =>
  request({ url: "/api/getRole", method: "GET" });

// 7. 获取地区列表
export const reqGetRegion = () => request({ url: "/api/getRegion" });
