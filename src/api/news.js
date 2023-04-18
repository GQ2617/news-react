import request from "../config/request";

// 撰写新闻
// 1. 获取新闻分类
export const reqGetCategory = () => request({ url: "/api/getNewsCategory" });
// 2. 保存草稿或提交审核
export const reqSaveNews = (data) =>
  request({ url: "/api/saveNews", method: "POST", data });

// 新闻分类
// 1. 添加分类
export const reqAddCategory = (data) =>
  request({ url: "/api/addCategory", method: "POST", data });
// 2. 删除分类
export const reqDelCategory = (id) =>
  request({ url: `/api/deleteCategory/${id}`, method: "DELETE" });

// 草稿箱
// 1. 获取草稿箱新闻
export const reqGetDraft = (author) =>
  request({ url: `/api/getDraftByUser?author=${author}`, method: "GET" });
// 2. 更新草稿箱新闻
export const reqUpdateDraft = (id, data) =>
  request({ url: `/api/updateNews/${id}`, method: "POST", data });
// 3. 删除草稿箱新闻
export const reqDelDraft = (id) =>
  request({ url: `/api/deleteDraft/${id}`, method: "DELETE" });
// 4. 获取指定新闻
export const reqGetNewsById = (id) =>
  request({ url: `/api/getNewsById/${id}`, method: "GET" });
