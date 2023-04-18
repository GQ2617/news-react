import React, { useState, useEffect } from "react";
import {
  reqGetPub,
  reqPublishNews,
  reqSunsetNews,
  reqDelNews,
} from "../../../../api/publish";
import { useNavigate } from "react-router-dom";
import { Button, message, Table, Modal } from "antd";

export default function AboutPublish(props) {
  const publishState = props.publishState;
  const { username } = JSON.parse(localStorage.getItem("userinfo"));
  const [list, setList] = useState([]);
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
            {publishState == 1 && (
              <Button type="primary" onClick={() => publishNews(item.id)}>
                发布
              </Button>
            )}
            {publishState == 2 && (
              <Button type="primary" onClick={() => sunsetNews(item.id)}>
                下线
              </Button>
            )}
            {publishState == 3 && (
              <Button type="primary" onClick={() => deleteNews(item.id)}>
                删除
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    initList();
  }, []);
  // 相关函数
  const initList = async () => {
    const res = await reqGetPub(publishState, username);
    if (res.data.status == 0) {
      setList(res.data.data);
    }
  };
  // 事件回调
  // 发布新闻
  const publishNews = async (id) => {
    const res = await reqPublishNews(id);
    if (res.data.status == 0) {
      message.success("发布新闻成功");
      initList();
    } else {
      message.error(res.data.message);
    }
  };
  // 下线新闻
  const sunsetNews = async (id) => {
    const res = await reqSunsetNews(id);
    if (res.data.status == 0) {
      message.success("下线新闻成功");
      initList();
    } else {
      message.error(res.data.message);
    }
  };
  // 删除新闻
  const deleteNews = (id) => {
    Modal.confirm({
      title: "提示",
      // icon: <ExclamationCircleOutlined />,
      content: "您确认要删除该新闻吗？",
      okText: "确认",
      cancelText: "取消",
      onOk: async () => {
        const res = await reqDelNews(id);
        if (res.data.status == 0) {
          message.success("删除新闻成功");
          initList();
        } else {
          message.error(res.data.message);
        }
      },
    });
  };
  return (
    <div>
      {" "}
      <Table
        columns={columns}
        dataSource={list}
        rowKey={(item) => item.id}
        pagination={{ pageSize: 10, position: ["bottomCenter"] }}
      />
    </div>
  );
}
