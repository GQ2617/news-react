import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { Button, Checkbox, Form, Input, Card, message } from "antd";

import { reqLogin } from "../../api/login";
import cache from "../../utils/cache";

export default function Login() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  // 登录验证成功
  const onFinish = async (values) => {
    const res = await reqLogin(values);

    if (res.data.status == 0) {
      cache.setCache("newToken", res.data.token);
      cache.setCache("userinfo", res.data.data);
      messageApi.open({ type: "success", content: "登陆成功" });
      navigate("/home");
    } else {
      messageApi.open({ type: "error", content: res.data.message });
    }
  };
  // 登录验证失败
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      {contextHolder}
      <div className="login">
        <Card
          title="新闻后台管理"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

// import React from "react";
// import { Button, message, Space } from "antd";
// const Login = () => {
//   const [messageApi, contextHolder] = message.useMessage();
//   const success = () => {
//     messageApi.open({
//       type: "success",
//       content: "This is a success message",
//     });
//   };
//   const error = () => {
//     messageApi.open({
//       type: "error",
//       content: "This is an error message",
//     });
//   };
//   const cahnge = () => {
//     if (1) {
//       messageApi.open({
//         type: "warning",
//         content: "This is a warning message",
//       });
//     }
//   };
//   return (
//     <>
//       {contextHolder}
//       <Space>
//         <Button onClick={success}>Success</Button>
//         <Button onClick={error}>Error</Button>
//         <Button onClick={cahnge}>Warning</Button>
//       </Space>
//     </>
//   );
// };
// export default Login;
