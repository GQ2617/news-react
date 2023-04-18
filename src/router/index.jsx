import { Navigate } from "react-router-dom";
// 登录
import Login from "../views/Login/index";
// 无权限
import Nopermisson from "../views/NoPermisson";
// 新闻
import News from "../views/News/index";
// 新闻-首页
import Home from "../views/News/Home";
// 新闻-用户管理
import UserList from "../views/News/User/UserList";
// 新闻-权限管理
import RoleList from "../views/News/Right/RoleList";
import RoleManage from "../views/News/Right/RightManage";
// 新闻-新闻管理
import AddNews from "../views/News/News/AddNews";
import Draft from "../views/News/News/Draft";
import Category from "../views/News/News/Categroy";
import PreviewNews from "../views/News/News/Page/PreviewNews";
import UpdateNews from "../views/News/News/Page/UpdateNews";
// 新闻-审核管理
import AuditNews from "../views/News/Audit/AuditNews";
import AuditList from "../views/News/Audit/AuditList";
// 新闻-发布管理
import UnPublish from "../views/News/Publish/UnPublish";
import Published from "../views/News/Publish/Published";
import Sunset from "../views/News/Publish/Sunset";

export default [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: localStorage.getItem("newToken") ? (
      <News />
    ) : (
      <Navigate to="/login" />
    ),

    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", element: <Home /> },
      { path: "/user-manage/list", element: <UserList /> },
      { path: "/right-manage/role/list", element: <RoleList /> },
      { path: "/right-manage/right/list", element: <RoleManage /> },
      { path: "/news-manage/add", element: <AddNews /> },
      { path: "/news-manage/draft", element: <Draft /> },
      { path: "/news-manage/category", element: <Category /> },
      { path: "/news-manage/update/:id", element: <UpdateNews /> },
      { path: "/news-manage/preview/:id", element: <PreviewNews /> },
      { path: "/audit-manage/audit", element: <AuditNews /> },
      { path: "/audit-manage/list", element: <AuditList /> },
      { path: "/publish-manage/unpublished", element: <UnPublish /> },
      { path: "/publish-manage/published", element: <Published /> },
      { path: "/publish-manage/sunset", element: <Sunset /> },
    ],
  },
  {
    path: "*",
    element: <Nopermisson />,
  },
];
