import { useNavigate } from 'react-router-dom';
import style from './index.module.css';
import elefanteLogo from '../../../shared/assets/elefanteLogo.png';
import personIcon from '../../../shared/assets/person.png';
import libraryIcon from '../../../shared/assets/biblioteca.png';
import searchIcon from '../../../shared/assets/lupa.png';

export default function Sidebar() {

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
          <button className={style.button} >
            <img src={searchIcon} alt="Buscar icone" className={style.icon} />
            <div>
              Buscar
            </div>
          </button>
          <button className={style.button}>     
            <img src={personIcon} alt="Perfil icone" className={style.icon} />
            <div>
              Perfil
            </div>
          </button>
          <button className={style.button} onClick={() => navigateTo('/biblioteca')}>
            <img src={libraryIcon} alt="Biblioteca icone" className={style.icon} />
            <div>
              Biblioteca
            </div>
          </button>
        </div>
      
        <div className={style.player}>
          <div>
            <div className={style.cover}>

            </div>
            <div className={style.songName}>
              song name
            </div>
          </div>
          <div className={style.actions}>
            <button className={style.actionsButton}>&lt;</button>
            <button className={style.actionsButton}>||</button>
            <button className={style.actionsButton}>&gt;</button>
            <button className={style.actionsButton}>&lt;3</button>
            <button className={style.actionsButton}>@</button>
            <button className={style.actionsButton}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}