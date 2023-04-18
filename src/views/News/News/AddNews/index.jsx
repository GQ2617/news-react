import React, { useState, useEffect } from "react";
import { reqGetCategory, reqSaveNews } from "../../../../api/news";
import NewsEditor from "../../../../components/NewsEditor";

import { Select, Form, Button, Steps, Input, message } from "antd";
const { Option } = Select;
export default function AddNews() {
  const [categoryList, setCategoryList] = useState([]);
  const [formInfo, setFormInfo] = useState({});
  const [content, setContent] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));

  // 钩子函数
  useEffect(() => {
    initAddNews();
  }, []);
  // 相关函数
  const initAddNews = async () => {
    const res = await reqGetCategory();
    if (res.data.status == 0) {
      setCategoryList(res.data.data);
    }
  };
  // 事件回调
  // 1. 进度条
  const handleStep = (num) => {
    if (currentStep == 0) {
      form.validateFields().then((value) => {
        if (value) {
          setFormInfo(value);
          setCurrentStep((currentStep) => currentStep + num);
        }
      });
    } else {
      if (num == -1) {
        setCurrentStep((currentStep) => currentStep + num);
      } else {
        if (content == "" || content.trim() == "<p></p>") {
          message.error("新闻内容不能为空");
        } else {
          setCurrentStep((currentStep) => currentStep + num);
        }
      }
    }
  };
  // 2. 保存草稿或提交审核
  const handleSave = async (auditState) => {
    const data = {
      ...formInfo,
      content: content,
      region: userinfo.region,
      author: userinfo.username,
      roleId: userinfo.roleId,
      auditState,
      publishState: 0,
      star: 0,
      view: 0,
      createTime: Date.now(),
      publishTime: 0,
    };
    const res = await reqSaveNews(data);
    if (res.data.status == 0) {
      message.success(auditState == 0 ? "保存草稿成功！" : "提交审核成功!");
    } else {
      message.error(auditState == 0 ? "保存草稿失败！" : "提交审核失败!");
    }
  };

  return (
    <div>
      {/* 标题 */}
      <p
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          margin: "20px 0 30px 0px",
        }}
      >
        撰写新闻
      </p>
      {/* 步骤条 */}
      <Steps
        current={currentStep}
        items={[
          {
            title: "基本信息",
            description: "新闻标题，新闻分类",
          },
          {
            title: "新闻内容",
            description: "新闻主体内容",
          },
          {
            title: "新闻提交",
            description: "保存草稿或提交审核",
          },
        ]}
      />
      {/* 内容 */}
      <div style={{ margin: "30px 0" }}>
        {/* 步骤一 */}
        {currentStep == 0 && (
          <Form
            form={form}
            labelCol={{
              span: 2,
            }}
            wrapperCol={{
              span: 20,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: "请输入新闻标题",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="新闻分类"
              name="category"
              rules={[
                {
                  required: true,
                  message: "请选择新闻分类",
                },
              ]}
            >
              <Select>
                {categoryList.map((item) => {
                  return (
                    <Option value={item.value} key={item.id}>
                      {item.value}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Form>
        )}
        {/* 步骤二 */}
        {currentStep == 1 && (
          <NewsEditor
            getContent={(value) => {
              setContent(value);
            }}
            content={content}
          ></NewsEditor>
        )}
      </div>
      {/* 按钮 */}
      <div>
        {currentStep > 0 && (
          <Button
            type="primary"
            onClick={() => handleStep(-1)}
            style={{ marginRight: "20px" }}
          >
            上一步
          </Button>
        )}
        {currentStep < 2 && (
          <Button type="primary" onClick={() => handleStep(1)}>
            下一步
          </Button>
        )}
        {currentStep === 2 && (
          <>
            <Button type="primary" onClick={() => handleSave(0)}>
              保存草稿
            </Button>
            <Button onClick={() => handleSave(1)}>提交审核</Button>
          </>
        )}
      </div>
    </div>
  );
}
