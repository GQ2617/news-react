import request from "../config/request";

// 1. 获取审核列表
export const reqGetAudit = (author) =>
  request({ url: `/api/getAuditNews?author=${author}` });
// 2. 获取审核中新闻
export const reqGetAuditing = (auditState) =>
  request({ url: `/api/getAuditingNews?auditState=${auditState}` });
// 3. 审核通过
export const reqPassAudit = (id) =>
  request({ url: `/api/auditPass/${id}`, method: "POST" });
// 4. 审核相关
export const reqAboutAudit = (id, auditState) =>
  request({ url: `/api/audit/${id}`, method: "POST", data: { auditState } });
// 5. 发布
export const reqPublishAudit = (id) =>
  request({
    url: `/api/publishNews/${id}`,
    method: "POST",
    data: { publishTime: Date.now() },
  });
