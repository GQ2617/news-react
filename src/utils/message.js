import { message } from "antd";
const [messageApi, contextHolder] = message.useMessage();
export default {
  success: (content) => {
    messageApi.open({
      type: "success",
      content,
    });
  },
  error: (info) => {
    messageApi.open({
      type: "error",
      content,
    });
  },
  warning: (info) => {
    messageApi.open({
      type: "warning",
      content,
    });
  },
};
