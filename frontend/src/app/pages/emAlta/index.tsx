import { useEffect, useState } from 'react';
import style from './index.module.css';
import trophyIcon from '../../../shared/assets/trofeu.png';
import bannerArt from '../../../shared/assets/art1.png';

export default function EmAlta() {

  interface Song {
    name: string;
    artistName: string;
    songId: number;
    cover: string;
    album: number;
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
              <div className={style.numberIndex}>
                <h1>{index + 1}</h1>
              </div>
              <img
                className={style.musicCover}
                src={song.cover}
                alt={`Capa da música ${song.name}`}
              />
              <div className={style.musicInfo}>
                <h1>{song.name}</h1>
                <h2>{song.artistName}</h2>
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