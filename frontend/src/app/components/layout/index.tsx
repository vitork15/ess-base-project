import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar";
import style from "./index.module.css";

export default function Layout() {
  return (
    <div className={style.mainLayout}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet /> {/* Aqui serão carregadas as páginas */}
      </div>
    </div>
  );
}