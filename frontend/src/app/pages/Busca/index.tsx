import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar';
import styles from './index.module.css';

export default function SearchPage() {

  const navigate = useNavigate();
  const navigateTo = (path: string) => {
    navigate(path);
  }

  return (
    <div className='mainLayout'>
      <div>
        <Sidebar/>
      </div>

      <main className="content">

        <header className={styles.header}>
          <div className={styles.search_container}>
              <input className={styles.search_container_input} type="text" placeholder="Pesquisar..." />
              <button className={styles.search_button}>&#128269;</button>
          </div>
        </header>

        <section className={styles.results_header}>
          <h2>Resultados</h2>
          <div className="filter">
            <button className={styles.filter_button}>Álbum</button>
            <button className={styles.filter_button}>Playlist</button>
            <button className={styles.filter_button}>Artista</button>
          </div>
        </section>
        
        <section className={styles.result_list}>
          
          <article className={styles.result_item}>
            <div className={styles.thumbnail}></div>
            <div className={styles.info}>
              <h3>Título do Álbum/Playlist</h3>
              <p>Informações adicionais</p>
            </div>
            <button className={styles.more_options}>&#8942;</button>
          </article>
          
          
          <article className={styles.result_item}>
            <div className={styles.thumbnail}></div>
            <div className={styles.info}>
              <h3>Título do Álbum/Playlist</h3>
              <p>Informações adicionais</p>
            </div>
            <button className={styles.more_options}>&#8942;</button>
          </article>
          
          
          <article className={styles.result_item}>
            <div className={styles.thumbnail}></div>
            <div className={styles.info}>
              <h3>Título do Álbum/Playlist</h3>
              <p>Informações adicionais</p>
            </div>
            <button className={styles.more_options}>&#8942;</button>
          </article>
        </section>
      </main>
    </div>
  );
}