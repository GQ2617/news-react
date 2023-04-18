import request from "../config/request";
// 1. 获取角色列表
export const reqGetRoleList = () => request({ url: "/api/getRole" });
// 2. 添加角色
export const reqAddRole = (data) =>
  request({ url: "/api/addRole", method: "POST", data });
// 3. 删除角色
export const reqDelRole = (id) =>
  request({ url: `/api/deleteRole/${id}`, method: "DELETE" });
// 4. 获取用户权限
export const reqGetRoleRights = (id) =>
  request({ url: `/api/getRoleRights/${id}` });
// 5. 修改权限
export const reqUpdateRoleRights = (data) =>
  request({ url: "/api/updateRoleRigths", method: "POST", data });
