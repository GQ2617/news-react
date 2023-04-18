import React, { useState, useEffect } from "react";
import {
  reqGetRoleList,
  reqGetRoleRights,
  reqAddRole,
  reqDelRole,
  reqUpdateRoleRights,
} from "../../../../api/role";
import { reqGetRightsList } from "../../../../api/rights";

import { Table, message, Button, Modal, Tree } from "antd";
import { UnorderedListOutlined, DeleteOutlined } from "@ant-design/icons";

export default function RoleList() {
  const [roleList, setRoleList] = useState([]);
  const [rightsList, setRightsList] = useState([]);
  const [roleRightsList, setRoleRightsList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      render: (roleName) => {
        return <b>{roleName}</b>;
      },
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <div>
            <Button
              type="primary"
              shape="circle"
              icon={<UnorderedListOutlined />}
              style={{ marginRight: "20px" }}
              onClick={() => openTree(item)}
            />
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
    initRole();
  }, []);
  // 相关函数
  const initRole = async () => {
    // 获取角色列表
    const role = await reqGetRoleList();
    if (role.data.status == 0) {
      setRoleList(role.data.data);
    }
    // 获取权限列表
    const rights = await reqGetRightsList();
    if (rights.data.status == 0) {
      rights.data.rights.map((item) => {
        item.title = item.label;
        item.key = item.rightName;
        item.children.map((item2) => {
          item2.title = item2.label;
          item2.key = item2.rightName;
        });
      });
      setRightsList(rights.data.rights);
    }
  };
  // 事件回调
  // 模态框开启(获取指定角色rights)
  const openTree = async (item) => {
    setCurrentId(item.id);
    const res = await reqGetRoleRights(item.id);
    if (res.data.status == 0) {
      setRoleRightsList(res.data.data);
      setIsModalOpen(true);
    }
  };
  // 模态框确认
  const handleOk = async () => {
    const res = await reqUpdateRoleRights({
      id: currentId,
      currentKeys: roleRightsList,
    });
    if (res.data.status == 0) {
      setIsModalOpen(false);
      message.success("分配权限成功！");
    } else {
      message.error(res.data.message);
    }
  };
  // 模态框取消
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // 树形控件选择
  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };
  const onCheck = (checkedKeys) => {
    setRoleRightsList(checkedKeys.checked);
  };
  return (
    <div>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={roleList}
        rowKey={(item) => item.id}
        pagination={{ pageSize: 10, position: ["bottomCenter"] }}
      />
      <Modal
        title="权限分配"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <Tree
          checkable
          checkedKeys={roleRightsList}
          treeData={rightsList}
          onCheck={onCheck}
          checkStrictly={true}
        />
      </Modal>
    </div>
  );
}
