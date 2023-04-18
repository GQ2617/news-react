import React, { useState, useEffect } from "react";
import {
  reqGetRightsList,
  reqDelRights,
  reqUpdateRights,
} from "../../../../api/rights";

import { message, Table, Button, Tag, Popover, Switch } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function RightManage() {
  const [rightsList, setRightsList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "权限名称",
      dataIndex: "label",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "权限路径",
      dataIndex: "rightName",
      render: (id) => {
        return <Tag color="blue">{id}</Tag>;
      },
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <div>
            <Popover
              content={
                <Switch
                  checked={item.pagepermisson == 1}
                  onChange={() => changePermisson(item)}
                />
              }
              title="页面配置项"
              trigger={item.pagepermisson == null ? "" : "hover"}
            >
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                style={{ marginRight: "20px" }}
                disabled={item.pagepermisson == null}
              />
            </Popover>

            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </div>
        );
      },
    },
  ];
  // 钩子函数
  useEffect(() => {
    initRight();
  }, []);
  // 相关函数
  const initRight = async () => {
    const res = await reqGetRightsList();
    if (res.data.status == 0) {
      res.data.rights.map((item) => {
        if (item.children.length == 0) {
          delete item.children;
        }
      });
      setRightsList(res.data.rights);
    } else {
      messageApi.error(res.data.message);
    }
  };
  // 事件回调
  const changePermisson = async (item) => {
    item.pagepermisson = item.pagepermisson == 1 ? 0 : 1;
    const res = await reqUpdateRights({
      id: item.id,
      pagepermisson: item.pagepermisson,
    });
    if (res.data.status == 0) {
      messageApi.success("修改页面配置项成功！");
      initRight();
    } else {
      messageApi.error(res.data.message);
    }
  };
  return (
    <div>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={rightsList}
        rowKey={(item) => item.id}
        pagination={{ pageSize: 10, position: ["bottomCenter"] }}
      />
    </div>
  );
}
