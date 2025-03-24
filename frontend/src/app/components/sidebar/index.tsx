import { useNavigate } from 'react-router-dom';
import style from './index.module.css';
import elefanteLogo from '../../../shared/assets/elefanteLogo.png';
import personIcon from '../../../shared/assets/person.png';
import libraryIcon from '../../../shared/assets/biblioteca.png';
import searchIcon from '../../../shared/assets/lupa.png';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { useState } from 'react';

export default function Sidebar() {

  const navigate = useNavigate();
  const navigateTo = (path: string) => {
  navigate(path);
  }

  const {musicPlaying, isArtist, userLogin, artistLogin, isLogged} = useContext(GlobalContext)
  const [musicName, setMusicName] = useState('');

  useEffect(() => {
    if(musicPlaying !== -1){
      fetch('http://localhost:5001/songs/'+ musicPlaying)
        .then(response => response.json())
        .then(data => {
          console.log('Music data:', data);
          setMusicName(data.name);
        })
        .catch(error => {
          console.error('Error fetching music:', error);
        });
    };
  })

  return (
    <div>
      <div className={style.sidebar}>
        <div className={style.menu} >
          <button className={style.logo} onClick={() => navigateTo('/home')}>
            <img src={elefanteLogo} alt="Elefante Logo" className={style.logoImg} />
            <div>Elefante</div>
          </button>
          <button className={style.button} onClick={() => navigateTo('/search')}>
            <img src={searchIcon} alt="Buscar icone" className={style.icon} />
            <div>
              Buscar
            </div>
          </button>
          {isLogged && (!isArtist) && 
            <button className={style.button} onClick={() => navigateTo('/users/'+userLogin)}>     
              <img src={personIcon} alt="Perfil icone" className={style.icon} />
              <div>
                Perfil
              </div>
            </button>
          }
          {isLogged && isArtist && 
            <button className={style.button} onClick={() => navigateTo('/artists/'+artistLogin)}>     
              <img src={personIcon} alt="Perfil icone" className={style.icon} />
              <div>
                Perfil
              </div>
            </button>
          }
          <button className={style.button} onClick={() => navigateTo('/biblioteca')}>
            <img src={libraryIcon} alt="Biblioteca icone" className={style.icon} />
            <div>
              Biblioteca
            </div>
          </button>
        </div>
      
        <div className={style.player} data-cy="player">
          <div>
            <div className={style.cover}>

            </div>
            <div className={style.songName}>
              {musicName}
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