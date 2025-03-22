import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './index.module.css';
import emAltaIcon from '../../../shared/assets/fire.png';

export default function InitialPage() {

  const navigate = useNavigate();
  const navigateTo = (path: string) => {
    navigate(path);
  }

  const [logedFlag, setLogedFlag] = useState(false); // Estado para controlar o popup

  const handleLogin = () => {
    setLogedFlag(true); // Fecha o popup após o login
  };

  return(
    <div className={style.body}>
    {!logedFlag && (
        <div className={style.blur}>
          <div className={style.loginPopup}>
            Faça login para acessar
            <button onClick={handleLogin} className={style.loginButton}>
              Entre ou cadastre-se
            </button>
          </div>
        </div>
      )}
      <div className={style.banner}>
        <div>
        <h1>Seja bem-vindo ao Elefante, o seu streaming favorito de música!</h1>
        </div>
      </div>
      <div className={style.sugests}>
      
      </div>
      <div className={style.atalhos}>
        <button className={style.atalhoButton} onClick={() => navigateTo('/emAlta')}>
          <img src={emAltaIcon} alt="Em alta" className={style.atalhoIcon}/>
          <div>
            Em alta
          </div>
        </button>
      </div>        
    </div>
  );
}