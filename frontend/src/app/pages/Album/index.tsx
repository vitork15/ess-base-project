import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from './index.module.css'; 

export const Cadastro: React.FC = () => {

  const navigate = useNavigate(); 

  const [step1, setStep1] = useState(true);
  const [songs, setSongs] = useState(new Array()) 

  const handleCancel = () => {
    alert("Cancelado!")
  };

  const handleContinue = () => {

    const input = document.getElementById("albumsongs") as HTMLInputElement;

    const num_songs = parseInt(input.value);
    let mysongs = new Array()
    for (let i = 0; i < num_songs; i++){
      mysongs.push(i+1)
    }
    setSongs(mysongs)
    setStep1(!step1)
  };

  const handleVoltar = () => {
    setStep1(!step1)
  };

  return (
    <div className={styles['cadastro-container']}>

      <div className={step1 ? styles['step1']: styles['hiddenstep']}> 

        <div className={styles['black-box']}>
        <p className={styles['title']}>TUDO PRONTO PARA SEU NOVO LANÇAMENTO!</p>
        </div>

        <div className={styles['form-container']}>
          {/* Capa do Álbum */}
          <div className={styles['album-cover-container']}>
            <p className={styles['font-bold']}>Capa do álbum</p>
            <div className={styles['album-cover']}></div>
          </div>

          {/* Formulário */}
          <div className={styles['text-left']}>
            <p className={styles['font-bold']}>Nome do novo lançamento</p>
            <input className={styles['form-input']} />

            <p className={styles['font-bold']}>Quantidade de Músicas</p>
            <input type="range" min="1" max="15" id = "albumsongs" className={styles['range-input']} />

            <div className={styles['input-group']}>
              <div className={styles['text-input-group']}>
                <p className={styles['font-bold']}>Gênero</p>
                <input className={styles['form-input-b']} />
              </div>
              <div className={styles['text-input-group']}>
                <p className={styles['font-bold']}>Subgênero</p>
                <input className={styles['form-input-b']} />
              </div>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className={styles['final-buttons']}>
          <button className={styles['a-button']} onClick={handleCancel}>Cancelar</button>
          <button className={styles['a-button']} onClick={handleContinue}>Continuar</button>
        </div>
      </div>

      <div className={step1 ? styles['hiddenstep'] : styles['step2'] }>
        <div className = {styles['uploadbox']}>
          {songs.map((num) => (
            <div key={num} className={styles['music-row']}>
              <label className={styles['font-bold']}>Música {num}</label>
              <input type="text" className={styles['input-song']} placeholder={`Nome ${num}`} />
            </div>
          ))}
        </div>
        <div className="album-box">
          <p>Album</p>
          <div className="album-placeholder"></div>
        </div>
        <div className={styles['final-buttons']}>
          <button className={styles['b-button']} onClick={handleVoltar}>Voltar</button>
          <button className={styles['b-button']}>Lançar</button>
        </div>
      </div>
    </div>
  );
};
