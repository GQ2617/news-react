import React, { useState, useEffect } from "react";
import {
  reqGetCategory,
  reqDelCategory,
  reqAddCategory,
} from "../../../../api/news";
import { Button, Table, Form, Input, Modal, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function Category() {
  const [categoryList, setCategoryList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "分类名称",
      dataIndex: "title",
      render: (title) => {
        return <span>{title}</span>;
      },
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <Button
            type="primary"
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => deleteCategory(item)}
          />
        );
      },
    },
  ];
  useEffect(() => {
    initCategory();
  }, []);
  // 相关函数
  const initCategory = async () => {
    const res = await reqGetCategory();
    if (res.data.status == 0) {
      setCategoryList(res.data.data);
    }
  };
  // 事件回调
  const addCategory = () => {
    setIsModalOpen(true);
    form.resetFields();
  };
  const handleOk = () => {
    form.validateFields().then(async (result) => {
      if (result) {
        result.value = result.title;
        const res = await reqAddCategory(result);
        if (res.data.status == 0) {
          message.success("添加分类成功");
          setIsModalOpen(false);
          initCategory();
        } else {
          message.error("添加分类失败");
        }
      }
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const deleteCategory = (item) => {
    Modal.confirm({
      title: "提示",
      // icon: <ExclamationCircleOutlined />,
      content: "您确认要删除该分类吗？",
      okText: "确认",
      cancelText: "取消",
      onOk: async () => {
        const res = await reqDelCategory(item.id);
        if (res.data.status == 0) {
          message.success("删除分类成功");
          setIsModalOpen(false);
          initCategory();
        } else {
          message.error(res.data.message);
        }
      },
    });
  };
  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: "30px" }}
        onClick={addCategory}
      >
        + 添加分类
      </Button>
      <Table
        columns={columns}
        dataSource={categoryList}
        rowKey={(item) => item.id}
        pagination={{ pageSize: 10, position: ["bottomCenter"] }}
      />
      <Modal
        title="添加分类"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form
          form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="分类名称"
            name="title"
            rules={[
              {
                required: true,
                message: "请输入分类名称",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
