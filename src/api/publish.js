import request from "../config/request";

// 1. 获取发布相关新闻
export const reqGetPub = (publishState, author) =>
  request({
    url: `/api/getPubNews?publishState=${publishState}&author=${author}`,
  });

// 2. 发布新闻
export const reqPublishNews = (id) =>
  request({
    url: `/api/publishNews/${id}`,
    method: "POST",
    data: { publishTime: Date.now() },
  });

// 3. 下线新闻
export const reqSunsetNews = (id) =>
  request({ url: `/api/sunsetNews/${id}`, method: "POST" });

// 4. 删除新闻
export const reqDelNews = (id) =>
  request({ url: `/api/deleteDraft/${id}`, method: "DELETE" });
