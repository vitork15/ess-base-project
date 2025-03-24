import React, {useEffect, useState, useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
import styles from "./index.module.css";
import ArtistPhoto from "/src/shared/assets/artist.svg";
import AlbumPhoto from "/src/shared/assets/album.jpg";
import MusicPhoto from "/src/shared/assets/musicsss.png";
import Edit from "/src/shared/assets/editArtist.png"
import { GlobalContext } from "../../context/GlobalContext";

const ArtistPage = () => {
    // Dados mockados para testar o layout
    const navigate = useNavigate();
        const navigateTo = (path: string) => {
          navigate(path);
        }
    const {login} = useParams();

    interface Song {
        songID: number;
        name: string;
        path: string;
        views: number;
    }
    
    interface Album {
        albumID: number;
        name: string;
        genero: string;
        subgenero: string;
        tipo: string;
    }

    interface Artist {
        login: string;
        name: string;
        bio: string;
        albuns: Album[];
        topSongs: Song[]
    }
    const [artist, setArtist] = useState<Artist>({
        login: "",
        name: "",
        bio: "",
        albuns: [],
        topSongs: []
    });
    const {isLogged} = useContext(GlobalContext);
    
    useEffect(() => {
        fetch(`http://localhost:5001/artists/${login}`) // Ajuste a URL do backend
            .then((response) => {
                if (!response.ok) throw new Error("Artista não encontrado");
                return response.json();
            })
            .then((data) => {
                setArtist(data);
            })
            .catch((err) => {

            });
    }, [login]); // Refaz a requisição quando o login mudar

    if (!artist) return <p>Artista não encontrado</p>;
    if (!artist.albuns) {artist.albuns = []};
    if (!artist.topSongs) {artist.topSongs = []};

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h1 className={styles.artistName}>{artist.name}</h1>
                {isLogged && (
                    <button className={styles.editButton} onClick={() => navigateTo('/artistupdate/' + artist.login)}>
                        <img src={Edit} alt={"Photo"} className={styles.editPhoto}/>
                        Editar
                    </button>
                )}
            </div>
            <div className={styles.body}>
                <div className={styles.discografiaArea}>
                        <h2 className={styles.discografiaTitle}>Mais ouvidas</h2>
                        <div className={styles.discografiaContent}>
                            {artist.topSongs.map((song) => (
                                <button key={song.songID} className={styles.songCard}>
                                    <img src={MusicPhoto} alt={"Photo"} className={styles.songPhoto}/>
                                    <div className={styles.albumInfos}>
                                        <h3 className={styles.albumGen}>{song.name}</h3>
                                        <div className={styles.albumGen}>{song.views} visualizações</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                </div>
                <div className={styles.discografiaArea}>
                    <h2 className={styles.discografiaTitle}>Discografia</h2>
                    <div className={styles.discografiaContent}>
                        {artist.albuns.map((album) => (
                            <button key={album.albumID} className={styles.albumCard} onClick={() => navigateTo('/album/' + album.albumID)}>
                                <img src={AlbumPhoto} alt={"Photo"} className={styles.albumPhoto}/>
                                <div className={styles.albumInfos}>
                                    <h3 className={styles.albumGen}>{album.name}</h3>
                                    <div className={styles.albumGen}>Gênero: {album.genero}</div>
                                    <div className={styles.albumGen}>Subgênero: {album.subgenero}</div>
                                </div>
                            </button>
                        ))}
                        {isLogged && (
                            <button className={styles.addAlbumButton} onClick={() => navigateTo('/albumregister')}>
                                <h3 className={styles.plus}>+</h3>
                                <div className={styles.albumGen}>Adicionar álbum</div>
                            </button>
                        )}
                    </div>
                </div>
                <div className={styles.card}>
                    <img src={ArtistPhoto} alt={"Photo"} className={styles.photo} />
                    <div className={styles.artistLogin}>@{artist.login}</div>
                    <div className={styles.bio}>{artist.bio}</div>
                </div>
            </div>
        </div>
    );
};

export default ArtistPage;