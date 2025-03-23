import { useNavigate } from 'react-router-dom';
import style from './index.module.css';
import elefanteLogo from '../../../shared/assets/elefanteLogo.png';

export default function SidebarLogin() {

  const navigate = useNavigate();
  const navigateTo = (path: string) => {
  navigate(path);
  }
  
  return (
    <div>
      <div className={style.sidebar}>
        <div className={style.menu} >
          <button className={style.logo} onClick={() => navigateTo('/home')}>
            <img src={elefanteLogo} alt="Elefante Logo" className={style.logoImg} />
            <div>Elefante</div>
          </button>
        </div>
        </div>
      </div>
  );
}