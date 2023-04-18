import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import "./index.css";

// 引入antd
import { Layout, Menu } from "antd";
const { Sider } = Layout;
import { FolderOpenOutlined, FolderOutlined } from "@ant-design/icons";
import cache from "../../utils/cache";

function SideMenu(props) {
  const { rights } = cache.getCache("userinfo");
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedKeys = [location.pathname];
  const openKeys = ["/" + location.pathname.split("/")[1]];
  // 钩子函数
  useEffect(() => {
    const data = checkPagepermisson(rights);
    setMenu(data);
  }, []);

  // 处理rights
  const checkPagepermisson = (rights) => {
    rights.map((item) => {
      if (item.children) {
        item.children.map((item2) => {
          item2.icon = <FolderOutlined />;
        });
      }
      item.icon = <FolderOpenOutlined />;
    });
    return rights;
  };

  // 跳转
  const onShow = (e) => {
    navigate(e.key);
  };
  return (
    <Sider trigger={null} collapsible collapsed={props.collapsed}>
      <div style={{ diplay: "flex", flexDirection: "column" }}>
        <div className={props.collapsed ? "logo logoWidth" : "logo"}>
          {!props.collapsed ? "新闻后台管理" : "后台"}
        </div>
        <div style={{ flex: "1", overflow: "auto" }}>
          <Menu
            onClick={onShow}
            theme="dark"
            mode="inline"
            defaultOpenKeys={openKeys}
            selectedKeys={selectedKeys}
            items={menu}
          />
        </div>
      </div>
    </Sider>
  );
}
export default connect((state) => ({
  collapsed: state.sidemenu.collapsed,
}))(SideMenu);
