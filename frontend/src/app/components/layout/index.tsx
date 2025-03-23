import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar";
import style from "./index.module.css";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default function Layout() {

    const navigate = useNavigate();
    const navigateTo = (path: string) => {
      navigate(path);
    }
  
  const {isLogged} = useContext(GlobalContext)
  
  useEffect(() => {
    if(!isLogged){
      navigateTo("/login")
    }
  }, []);

  return (
    <div className={style.mainLayout}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet /> {/* Aqui serão carregadas as páginas */}
      </div>
    </div>
  );
}