import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from './index.module.css'; 
import { useParams } from "react-router-dom";

const Cadastro: React.FC = () => {

  const navigate = useNavigate(); 

  const [step1, setStep1] = useState(true);
  const [songs, setSongs] = useState(new Array()) 
  const [albumName, setAlbumName] = useState("");
  const [genero, setGenero] = useState("");
  const [subgenero, setSubgenero] = useState("");
  const [songs_name, setSongsName] = useState([""]);
  const [songs_paths, setPaths] = useState([""]);
  const [login, setLogin] = useState("")
  const [feat, setFeat] = useState("");

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

  const handleCadastroAlbum = async () => {
    const album = {
      name: albumName, 
      genero: genero,
      subgenero: subgenero,
      songs: songs_name,
      songs_paths: songs_paths,
      artist_login: login,
      feat: feat
    };
  
    try {
      const response = await fetch("http://localhost:5001/albums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(album),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao cadastrar album");
      }
  
      const data = await response.json();
      alert("Album cadastrado com sucesso!");
      console.log(data);
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao cadastrar album!");
    }
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
            <input className={styles['form-input']} 
             value={albumName} 
             onChange={(e) => setAlbumName(e.target.value)} 
            />

            <p className={styles['font-bold']}>Quantidade de Músicas</p>
            <input type="range" min="1" max="15" id = "albumsongs" className={styles['range-input']} />

            <div className={styles['input-group']}>
              <div className={styles['text-input-group']}>
                <p className={styles['font-bold']}>Gênero</p>
                <input className={styles['form-input-b']} 
                value={genero} 
                onChange={(e) => setGenero(e.target.value)} 
                />
              </div>
              <div className={styles['text-input-group']}>
                <p className={styles['font-bold']}>Subgênero</p>
                <input className={styles['form-input-b']} 
                 value={subgenero} 
                 onChange={(e) => setSubgenero(e.target.value)} 
                />
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
          <button className={styles['b-button']} onClick={handleCadastroAlbum}>Lançar</button>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;