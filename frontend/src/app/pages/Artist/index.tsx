import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import ArtistPhoto from "/src/shared/assets/artist.svg";
import AlbumPhoto from "/src/shared/assets/album.jpg";

const ArtistPage = () => {
    // Dados mockados para testar o layout
    const {login} = useParams();
    
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
    }
    const [artist, setArtist] = useState<Artist>({
        login: "",
        name: "",
        bio: "",
        albuns: [], // 🔹 Garante que albuns seja um array vazio inicialmente
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch(`http://localhost:5001/artists/${login}`) // Ajuste a URL do backend
            .then((response) => {
                if (!response.ok) throw new Error("Artista não encontrado");
                return response.json();
            })
            .then((data) => {
                setArtist(data);
                console.log(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [login]); // Refaz a requisição quando o login mudar

    if (!artist) return <p>Artista não encontrado</p>;
    if (!artist.albuns) {artist.albuns = []};

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h1 className={styles.artistName}>{artist.name}</h1>
            </div>
            <div className={styles.body}>
                    <div className={styles.discografiaArea}>
                        <h2 className={styles.discografiaTitle}>Discografia</h2>
                        <div className={styles.discografiaContent}>
                            {artist.albuns.map((album) => (
                                <button key={album.albumID} className={styles.albumCard}>
                                    <img src={AlbumPhoto} alt={"Photo"} className={styles.albumPhoto} />
                                    <div className={styles.albumInfos}>
                                        <h3 className={styles.albumTitle}>{album.name}</h3>
                                        <div className={styles.albumGen}>Gênero: {album.genero}</div>
                                        <div className={styles.albumGen}>Subgênero: {album.subgenero}</div>
                                    </div>
                                </button>
                            ))}
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