import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar";
import style from "./index.module.css";
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from "../../context/GlobalContext";

export default function Layout() {

  const navigate = useNavigate();
  const navigateTo = (path: string) => {
    navigate(path);
  }

  const {isLogged} = useContext(GlobalContext)

  const handleLogin = () => {
    navigateTo('/login')
  };

  const handleLoginA = () => {
    navigateTo('/artistlogin')
  };
  
  return (
    <div className={style.mainLayout}>
      <Sidebar />
        <div>
        <div style={{ flex: 1, padding: "20px" }}>
          {!isLogged && (
          <div className={style.blur}>
            <div className={style.loginPopup}>
              Faça login para acessar
              <button onClick={handleLogin} className={style.loginButton}>
                Entre ou cadastre-se
              </button>
              <button onClick={handleLoginA} className={style.loginButton}>
                Entre ou cadastre-se como artista
              </button>
            </div>
          </div> )}
          <div style={{ pointerEvents: isLogged ? "auto" : "none" }}>
            <Outlet />
          </div>
        </div>{/* Aqui serão carregadas as páginas */}
      </div>
    </div>
  );
}