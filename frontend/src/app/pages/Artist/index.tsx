import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import ArtistPhoto from "/src/shared/assets/artist.svg";
import AlbumPhoto from "/src/shared/assets/album.jpg";
import MusicPhoto from "/src/shared/assets/musicsss.png";
import Edit from "/src/shared/assets/edit.png"

const ArtistPage = () => {
    // Dados mockados para testar o layout
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLogged, setIsLogged] = useState(true);
    
    useEffect(() => {
        fetch(`http://localhost:5001/artists/${login}`) // Ajuste a URL do backend
            .then((response) => {
                if (!response.ok) throw new Error("Artista não encontrado");
                return response.json();
            })
            .then((data) => {
                setArtist(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
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
                    <button className={styles.editButton}>
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
                            <button key={album.albumID} className={styles.albumCard}>
                                <img src={AlbumPhoto} alt={"Photo"} className={styles.albumPhoto}/>
                                <div className={styles.albumInfos}>
                                    <h3 className={styles.albumGen}>{album.name}</h3>
                                    <div className={styles.albumGen}>Gênero: {album.genero}</div>
                                    <div className={styles.albumGen}>Subgênero: {album.subgenero}</div>
                                </div>
                            </button>
                        ))}
                        {isLogged && (
                            <button className={styles.addAlbumButton}>
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