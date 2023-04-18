import React, { useState, useEffect } from "react";
import {
  reqGetAuditing,
  reqPassAudit,
  reqAboutAudit,
} from "../../../../api/audit";
import { useNavigate } from "react-router-dom";
import { Table, Button, message } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

export default function AuditNews() {
  const [auditingList, setAuditingList] = useState([]);
  const navigate = useNavigate();
  const columns = [
    {
      title: "新闻标题",
      dataIndex: "title",
      render: (title, item) => {
        return (
          <a onClick={() => navigate(`/news-manage/preview/${item.id}`)}>
            {title}
          </a>
        );
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
      title: "操作",
      render: (item) => {
        return (
          <div>
            <Button
              type="primary"
              style={{
                marginRight: "20px",
              }}
              shape="circle"
              icon={<CheckOutlined />}
              onClick={() => handlePass(item.id)}
            />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<CloseOutlined />}
              onClick={() => handleRefuse(item.id)}
            />
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    initAuditing();
  }, []);
  // 相关函数
  const initAuditing = async () => {
    const res = await reqGetAuditing(1);
    if (res.data.status == 0) {
      setAuditingList(res.data.data);
    }
  };
  // 事件回调
  // 通过审核
  const handlePass = async (id) => {
    const res = await reqPassAudit(id);
    if (res.data.status == 0) {
      message.success("审核通过,请前往审核列表发布");
      initAuditing();
    } else {
      message.error(res.data.message);
    }
  };
  // 驳回审核
  const handleRefuse = async (id) => {
    const res = await reqAboutAudit(id, 4);
    if (res.data.status == 0) {
      message.success("审核未通过,请前往审核列表修改");
      initAuditing();
    } else {
      message.error(res.data.message);
    }
  };
  return (
    <div>
      <Table
        columns={columns}
        dataSource={auditingList}
        rowKey={(item) => item.id}
        pagination={{ pageSize: 10, position: ["bottomCenter"] }}
      />
    </div>
  );
}
