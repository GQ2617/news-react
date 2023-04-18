import React, { useState, useEffect } from "react";
import {
  reqGetUserList,
  reqAddUser,
  reqDelUser,
  reqUpdateUserInfo,
  reqUpdateUserState,
  reqGetRegion,
  reqGetRoleList,
} from "../../../api/user";

import {
  Button,
  Table,
  Switch,
  Modal,
  Form,
  Input,
  Select,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

export default function UserList() {
  const [userList, setUserList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const columns = [
    {
      title: "区域",
      dataIndex: "region",
      render: (region) => {
        return <b>{region}</b>;
      },
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      render: (roleName) => {
        return roleName;
      },
    },
    {
      title: "用户名",
      dataIndex: "username",
      render: (username) => {
        return username;
      },
    },
    {
      title: "用户状态",
      dataIndex: "roleState",
      render: (roleState, item) => {
        return (
          <Switch onChange={() => changeState(item)} checked={roleState} />
        );
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
              icon={<EditOutlined />}
              style={{ marginRight: "20px" }}
              onClick={() => editUser(item)}
            />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => deleteUser(item)}
            />
          </div>
        );
      },
    },
  ];
  // 钩子函数
  useEffect(() => {
    initTable();
  }, []);
  // 函数
  const initTable = async () => {
    // 1. 获取用户列表
    reqGetUserList().then((res) => {
      setUserList(res.data.data);
    });

    // 2. 获取用户角色
    reqGetRoleList().then((res) => {
      setRoleList(res.data.data);
    });

    // 3. 获取地区
    reqGetRegion().then((res) => {
      setRegionList(res.data.data);
    });
  };
  // 事件回调
  // 1. 修改用户状态
  const changeState = async (item) => {
    item.roleState = item.roleState == 1 ? 0 : 1;
    const res = await reqUpdateUserState({
      id: item.id,
      roleState: item.roleState,
    });
    if (res.data.status == 0) {
      messageApi.success("修改用户状态成功");
    } else {
      messageApi.error(res.data.message);
    }
    initTable();
  };
  // 2. 模态框打开(添加用户)
  const addUser = () => {
    setIsEdit(null);
    setIsModalOpen(true);
    form.resetFields();
  };
  // 3. 模态框打开(编辑用户)
  const editUser = (item) => {
    setIsEdit(item.id);
    setIsModalOpen(true);
    form.setFieldsValue({
      ...item,
    });
  };
  // 3. 模态框确认
  const handleOk = () => {
    form.validateFields().then(async (result) => {
      if (isEdit) {
        // 修改用户
        result.id = isEdit;
        const res = await reqUpdateUserInfo(result);
        if (res.data.status == 0) {
          messageApi.success("修改用户信息成功！");
          setIsModalOpen(false);
          initTable();
        } else {
          messageApi.error(res.data.message);
        }
      } else {
        // 添加用户
        const res = await reqAddUser(result);
        if (res.data.status == 0) {
          messageApi.success("添加用户成功！");
          setIsModalOpen(false);
          initTable();
        } else {
          messageApi.error(res.data.message);
        }
      }
    });
  };
  // 4. 模态框取消
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // 5. 删除用户
  const deleteUser = (item) => {
    Modal.confirm({
      title: "提示",
      // icon: <ExclamationCircleOutlined />,
      content: "您确认要删除改用户吗？",
      okText: "确认",
      cancelText: "取消",
      onOk: async () => {
        const res = await reqDelUser(item.id);
        if (res.data.status == 0) {
          messageApi.success("删除用户成功！");
          initTable();
        } else {
          messageApi.error(res.data.message);
        }
      },
    });
  };
  return (
    <div>
      {contextHolder}
      <Button type="primary" style={{ marginBottom: "20px" }} onClick={addUser}>
        + 添加用户
      </Button>
      <Table
        columns={columns}
        dataSource={userList}
        rowKey={(item) => item.id}
        pagination={{ pageSize: 10, position: ["bottomCenter"] }}
      />

      <Modal
        title={isEdit ? "修改用户" : "添加用户"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form {...layout} form={form} name="control-hooks" autoComplete="off">
          {/* 用户名 */}
          <Form.Item
            name="username"
            label="用户名"
            rules={[
              {
                required: true,
                message: "请输入用户名",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* 密码 */}
          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* 地区 */}
          <Form.Item
            name="region"
            label="地区"
            rules={[
              {
                required: true,
                message: "请选择用户角色",
              },
            ]}
          >
            <Select placeholder="请选择用户地区" allowClear>
              {regionList.map((item) => {
                return (
                  <Option value={item.value} key={item.id}>
                    {item.title}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          {/* 角色 */}
          <Form.Item
            name="roleId"
            label="角色"
            rules={[
              {
                required: true,
                message: "请选择用户角色",
              },
            ]}
          >
            <Select placeholder="请选择用户角色" allowClear>
              {roleList.map((item) => {
                return (
                  <Option value={item.id} key={item.id}>
                    {item.roleName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
