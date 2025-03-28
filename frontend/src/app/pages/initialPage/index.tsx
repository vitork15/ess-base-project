import { useNavigate } from 'react-router-dom';
import style from './index.module.css';
import emAltaIcon from '../../../shared/assets/fire.png';

export default function InitialPage() {

  const navigate = useNavigate();

  return(
    <div className={style.body}>
      <div className={style.banner}>
        <div>
        <h1>Seja bem-vindo ao Elefante, o seu streaming favorito de música!</h1>
        </div>
      </div>
      <div className={style.sugests}>  
      </div>
      <div className={style.atalhos}>
        <button className={style.atalhoButton} onClick={() => navigate('/emAlta')}>
          <img src={emAltaIcon} alt="Em alta" className={style.atalhoIcon}/>
          <div>
            Em alta
          </div>
        </button>
      </div>        
    </div>
  );
}