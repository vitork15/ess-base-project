import { Outlet } from "react-router-dom";
import SidebarLogin from "../sidebarLogin";
import style from "./index.module.css";

export default function LayoutLogin() {
  return (
    <div className={style.mainLayout}>
      <SidebarLogin />
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet /> {/* Aqui serão carregadas as páginas */}
      </div>
    </div>
  );
}