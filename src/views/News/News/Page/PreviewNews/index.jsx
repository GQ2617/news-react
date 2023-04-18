import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment/moment";

import { reqGetNewsById } from "../../../../../api/news";
import { Card, Descriptions } from "antd";

export default function PreviewNews() {
  const [news, setNews] = useState({});
  const { id } = useParams();
  const auditList = ["未审核", "审核中", "已通过", "未通过"];
  const publishList = ["未发布", "待发布", "已上线", "已下线"];
  useEffect(() => {
    initNews();
  }, []);
  const initNews = async () => {
    const res = await reqGetNewsById(id);
    if (res.data.status == 0) {
      console.log(res.data.data);
      setNews(res.data.data);
    }
  };
  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
      <Card
        title={news.title + " (" + news.category + ")"}
        extra={
          <a href="#" onClick={() => window.history.back()}>
            返回
          </a>
        }
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="创建者">{news.author}</Descriptions.Item>
          <Descriptions.Item label="创建时间">
            {moment(Number(news.createTime)).format("YYYY-MM-DD HH:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="发布时间">
            {news.publishTime != 0
              ? moment(Number(news.publishTime)).format("YYYY-MM-DD HH:mm:ss")
              : "---"}
          </Descriptions.Item>
          <Descriptions.Item label="区域">{news.region}</Descriptions.Item>
          <Descriptions.Item label="审核状态">
            {auditList[news.auditState]}
          </Descriptions.Item>
          <Descriptions.Item label="发布状态">
            {publishList[news.publishState]}
          </Descriptions.Item>
          <Descriptions.Item label="访问数量">{news.view}</Descriptions.Item>
          <Descriptions.Item label="点赞数量">{news.star}</Descriptions.Item>
          <Descriptions.Item label="评论数量">{news.star}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card style={{ marginTop: "20px" }}>
        <div
          dangerouslySetInnerHTML={{
            __html: news.content,
          }}
        ></div>
      </Card>
    </div>
  );
}
