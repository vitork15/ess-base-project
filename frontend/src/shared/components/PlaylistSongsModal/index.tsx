import { useEffect, useState } from "react";
import { SongCard } from "../SongCard";
import styles from "./index.module.css"
import axios from "axios";

type ArtistInfo = {
    login: string
    name: string
    bio: string
}

type AlbumInfo = {
    albumID:number
    name: string
    qtd_songs: number
    genero: string
    subgenero: string | null
    tipo: string
    artist: ArtistInfo
}

type SongInfo = {
    songID: number
    name: string
    path: string
    views: number
    viewsWeek: number
    album: AlbumInfo
}


export const PlaylistSongsModal = ({playlistName, playlistID, onClose}) => {
  const [songs, setSongs] = useState<SongInfo[]>([])

  const fetchSongs = async (): Promise<SongInfo[]> => {
    const response = await axios.get<SongInfo[]>(`http://localhost:5001/songs?playlistID=${playlistID}`)
    return response.data
  }

  const deleteSongFromPlaylist = async (playlistID:number, songID:number) =>{
    let songIDlist:number[] = []
    for(let i=0;i<songs.length;i++){
        songIDlist.push(songs[i].songID)
    }
    songIDlist = songIDlist.filter(p => p!=songID)
    await axios.patch(`http://localhost:5001/playlists/${playlistID}`, {
        songs: songIDlist
    })

    const data = await fetchSongs()
    setSongs(data)
  }

  useEffect(() => {
    const fetchData = async () => {
        const data = await fetchSongs(); // Aguarda a resposta da API
        setSongs(data); // Atualiza o estado com os dados retornados
      };
  
      fetchData();
  }, []);

    return (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>
            <h2 className={styles.playlistTitle}>{playlistName}</h2>
            <div className={styles.songList}>
                {songs.map((song, index) => (
                <SongCard
                key={index}
                playlistID={playlistID}
                songID={song.songID}
                name={song.name}
                views={song.views}
                album={song.album.name}
                genre={song.album.genero}
                artist={song.album.artist.name}
                onRemove={deleteSongFromPlaylist}
                />
            ))}
            </div>
          </div>
        </div>
      );
}