import request from "../config/request";

// 1. 获取权限列表
export const reqGetRightsList = () => request({ url: `/api/getRights` });

// 2. 删除权限
export const reqDelRights = (id) =>
  request({ url: `/api/delRights/${id}`, method: "DELETE" });

// 3. 修改权限
export const reqUpdateRights = (data) =>
  request({ url: `/api/updateRights`, method: "POST", data });
