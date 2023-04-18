import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cache from "../../utils/cache";
import "./index.css";

// store
import { connect } from "react-redux";
import { changeCollapsed } from "../../redux/actions/sidemenu";

import { Layout, Dropdown, Avatar } from "antd";
const { Header } = Layout;
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

function TopHeader(props) {
  const navigate = useNavigate();
  const { username, roleName } = JSON.parse(localStorage.getItem("userinfo"));
  // 下拉菜单项
  const items = [
    { label: roleName, key: "item-1" }, // 菜单项务必填写 key
    { label: "退出登录", danger: true, key: "item-2" },
  ];
  // 1. 侧边栏控制
  const changeCollapsed = () => {
    props.changeCollapsed();
  };
  // 2. 退出登录
  const onClick = (e) => {
    if (e.key == "item-2") {
      cache.clearCache();
      navigate("/login");
    }
  };

  return (
    <Header
      className="site-layout-background"
      style={{
        padding: 0,
        backgroundColor: "white",
      }}
    >
      {React.createElement(
        props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: "trigger",
          onClick: changeCollapsed,
        }
      )}
      <div className="avatar">
        <span>欢迎{username}回来</span>
        <Dropdown menu={{ items, onClick }}>
          <Avatar
            size="{64}"
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </div>
    </Header>
  );
}

export default connect(
  (state) => ({
    collapsed: state.sidemenu.collapsed,
  }),
  { changeCollapsed }
)(TopHeader);
