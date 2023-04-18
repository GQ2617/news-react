// 汇总所有reducer
import { combineReducers } from "redux";
// 引入所有reducer
import sidemenu from "./sidemenu";
// 导出汇总
export default combineReducers({
  sidemenu,
});
