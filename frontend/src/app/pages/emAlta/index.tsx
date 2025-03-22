import { useEffect, useState } from 'react';
import style from './index.module.css';
import trophyIcon from '../../../shared/assets/trofeu.png';
import bannerArt from '../../../shared/assets/art1.png';

export default function EmAlta() {

  interface Song {
    songID: number,
    name: string,
    views: number
  }

  const [songs, setSongs] = useState<Song[]>([]);
  const [error, setError] = useState<string | null>(null); // Estado para armazenar a mensagem de erro


  useEffect(() => {
    // Fazendo a requisição para o backend
    fetch('http://localhost:5001/topsongs') 
      .then((response) => {
        if (response.status === 210) {
          setError('O número de músicas no sistema ainda é insuficiente para exibir a página. Aguarde só mais um pouco!');
        }
        return response.json();
      })
      .then((data) => setSongs(data))
      .catch((error) => {
        console.error('Erro ao buscar as músicas:', error);
        setError('Não foi possível se conectar com o servidor. Tente novamente mais tarde.');  
      });
  }, []);

  return (
    <div>
      <div>
        <div className={style.banner}>
          <div>
            As mais escutadas do momento!
          </div>
          <div>
            <img src={trophyIcon} alt='trofeu'className={style.trophyIcon}/>
          </div>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.musicBox}>

        {error !== null ? (
          <div className={style.errorMessage}>{error}</div>
        ) : (
          songs.map((song, index) => (
            <div key={index} className={style.musicCard}>
              <img
                className={style.musicCover}
                src={'Foto'}
                alt={`Capa da música ${song.name}`}
              />
              <div className={style.musicInfo}>
                <h1>{song.name}</h1>
                <h2>Nome do artista</h2>
              </div>
            </div>
          ))
        )}

        </div>
        <div>
        <img src={bannerArt} alt='trofeu' className={style.bannerArt}/>
        </div>
      </div>
    </div>
  );
}