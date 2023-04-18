import React, { useState, useEffect } from "react";
import {
  reqGetAudit,
  reqAboutAudit,
  reqPublishAudit,
} from "../../../../api/audit";
import { Table, Tag, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

export default function AuditList() {
  const navigate = useNavigate();
  const [auditList, setAuditList] = useState([]);
  const { username } = JSON.parse(localStorage.getItem("userinfo"));
  const audit = ["未审核", "审核中", "已通过", "未通过"];
  const columns = [
    {
      title: "新闻标题",
      dataIndex: "title",
      render: (title, item) => {
        return <a onClick={() => previewNews(item.id)}>{title}</a>;
      },
    },
    {
      title: "作者",
      dataIndex: "author",
    },
    {
      title: "新闻分类",
      dataIndex: "category",
    },
    {
      title: "审核状态",
      dataIndex: "auditState",
      render: (auditState) => {
        const color = ["", "orange", "green", "red"];
        return <Tag color={color[auditState - 1]}>{audit[auditState - 1]}</Tag>;
      },
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <div>
            {item.auditState === 2 && (
              <Button type="primary" onClick={() => handlePublish(item.id)}>
                发布
              </Button>
            )}
            {item.auditState === 1 && (
              <Button type="primary" onClick={() => handleCancel(item.id)}>
                撤销
              </Button>
            )}
            {item.auditState === 3 && (
              <Button type="primary" onClick={() => handleUpdate(item.id)}>
                修改
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    initAudit();
  }, []);
  // 相关函数
  const initAudit = async () => {
    const res = await reqGetAudit(username);
    if (res.data.status == 0) {
      setAuditList(res.data.data);
    }
  };
  // 事件回调
  // 预览新闻
  const previewNews = (id) => {
    navigate(`/news-manage/preview/${id}`);
  };
  // 发布
  const handlePublish = async (id) => {
    const res = await reqPublishAudit(id);
    if (res.data.status == 0) {
      message.success("发布新闻成功");
      initAudit();
    } else {
      message.error(res.data.message);
    }
  };
  // 撤销
  const handleCancel = async (id) => {
    const res = await reqAboutAudit(id, 0);
    console.log(res);
    if (res.data.status == 0) {
      message.success("撤销审核成功");
      initAudit();
    } else {
      message.error(res.data.message);
    }
  };
  // 修改
  const handleUpdate = (id) => {
    navigate(`/news-manage/update/${id}`);
  };
  return (
    <div>
      <Table
        columns={columns}
        dataSource={auditList}
        rowKey={(item) => item.id}
        pagination={{ pageSize: 10, position: ["bottomCenter"] }}
      />
    </div>
  );
}
