import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  reqGetDraft,
  reqUpdateDraft,
  reqDelDraft,
  reqGetNewsById,
  reqSaveNews,
} from "../../../../api/news";
import { reqAboutAudit } from "../../../../api/audit";
import { Table, message, Button, Tooltip } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
export default function Draft() {
  const navigate = useNavigate();
  const [draftList, setDraftList] = useState([]);
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "新闻标题",
      dataIndex: "title",
      render: (title, item) => {
        return <a onClick={() => previewDraft(item)}>{title}</a>;
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
          <>
            <Tooltip placement="bottom" title={<span>提交审核</span>}>
              <Button
                type="primary"
                shape="circle"
                icon={<UploadOutlined />}
                style={{ marginRight: "20px" }}
                onClick={() => submitAudit(item)}
              />
            </Tooltip>

            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              style={{ marginRight: "20px" }}
              onClick={() => editDraft(item)}
            />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => deleteDraft(item)}
            />
          </>
        );
      },
    },
  ];
  useEffect(() => {
    initDraft();
  }, []);
  // 相关函数
  const initDraft = async () => {
    const res = await reqGetDraft(userinfo.username);
    if (res.data.status == 0) {
      setDraftList(res.data.data);
    }
  };
  // 事件回调
  // 预览草稿
  const previewDraft = (item) => {
    navigate(`/news-manage/preview/${item.id}`);
  };
  // 提交审核
  const submitAudit = async (item) => {
    const res = await reqAboutAudit(item.id, 1);
    console.log(res);
    if (res.data.status == 0) {
      message.success("提交审核成功");
      initDraft();
    } else {
      message.error("提交审核失败");
    }
  };
  // 编辑草稿
  const editDraft = async (item) => {
    navigate(`/news-manage/update/${item.id}`);
  };
  // 删除草稿
  const deleteDraft = async (item) => {
    const res = await reqDelDraft(item.id);
    if (res.data.status == 0) {
      message.success("删除草稿成功");
      initDraft();
    } else {
      message.error("删除草稿失败");
    }
  };
  return (
    <div>
      <Table
        columns={columns}
        dataSource={draftList}
        rowKey={(item) => item.id}
        pagination={{ pageSize: 10, position: ["bottomCenter"] }}
      />
    </div>
  );
}
