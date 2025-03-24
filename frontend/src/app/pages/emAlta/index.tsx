import { useEffect, useState } from 'react';
import style from './index.module.css';
import trophyIcon from '../../../shared/assets/trofeu.png';
import bannerArt from '../../../shared/assets/art1.png';
import { GlobalContext } from '../../context/GlobalContext';
import { useContext } from 'react';

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
  const {setMusicPlaying} = useContext(GlobalContext);

  useEffect(() => {
    // Fazendo a requisição para o backend
    fetch('http://localhost:5001/topsongs') 
      .then((response) => {
        if (response.status === 210) {
          setError('O número de músicas no sistema ainda é insuficiente para exibir a página. Aguarde só mais um pouco!');
        }
        else{
          response.json().then((data) => {
            if (Array.isArray(data)) {
              setSongs(data);
            } else {
              setError('Não foi possível se conectar com o servidor. Tente novamente mais tarde.');
            }});
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar as músicas:', error);
        setError('Não foi possível se conectar com o servidor. Tente novamente mais tarde.');  
      });
  }, []);

  const renderSongs = () => {
    return (
      <>
        {songs.map((song, index) => (
          <div key={index} className={style.musicCard} onClick={() => {setMusicPlaying(song.songId); console.log(song.songId)}} data-cy={'musicCard'}>
            <div className={style.numberIndex}>
              <div>{index + 1}</div>
            </div>
            <img
              className={style.musicCover}
              src={song.cover}
              alt={`Capa da música ${song.name}`}
            />
            <div className={style.musicInfo}>
              <h1 data-cy={'musicName'}>{song.name}</h1>
              <h2>{song.artistName}</h2>
            </div>
          </div>
        ))}
      </>
    );
  }

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
            renderSongs()
          )}
        </div>
        <div>
        <img src={bannerArt} alt='trofeu' className={style.bannerArt}/>
        </div>
      </div>
    </div>
  );
}