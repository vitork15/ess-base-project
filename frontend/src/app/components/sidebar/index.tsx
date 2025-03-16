import style from './index.module.css';

export default function Sidebar() {
  return (
    <div className={style.sidebar}>

      <div className={style.menu}>
        <button className={style.logo}>
          <div>Elefante</div>
        </button>
        <button className={style.button}>
          Buscar
        </button>
        <button className={style.button}>
          Perfil
        </button>
        <button className={style.button}>
          Biblioteca
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
  );
}