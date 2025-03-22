import { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import styles from "./index.module.css"
import { Playlist } from "../../../shared/components/Playlist";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import { PlaylistModal } from "../../../shared/components/PlaylistModal";

// Definição do modelo da Playlist
interface PlaylistModel {
  playlistID: number;
  name: string;
  description: string;
  saveCount: number;
  imageURL: string;
}


export const Biblioteca = () => {
  const [playlists, setPlaylists] = useState<PlaylistModel[]>([]);
  const [modalOpenID, setModalOpenID] = useState(-1)

  const fetchPlaylists = async (): Promise<PlaylistModel[]> => {
    const response = await axios.get<PlaylistModel[]>("http://localhost:5001/playlists?userId=62");
    let list:PlaylistModel[] =  response.data;
    list.sort((a,b) => a.playlistID - b.playlistID)
    return list
  };

  const getPlaylistByID = (id:number) => {
    return playlists.filter(p => p.playlistID == id).at(0)
  }

  const onModalClose = async () => {
    setModalOpenID(-1)
    const data = await fetchPlaylists();
    setPlaylists(data);
  }

  const onModalOpen = (id:number) => {
    setModalOpenID(id)
  } 

  const deletePlaylist = async (id:number) => {
    await axios.delete(`http://localhost:5001/playlists/${id}`);
    const data = await fetchPlaylists();
    setPlaylists(data);
  }

  const createDummyPlaylist = async () => {

    await axios.post("http://localhost:5001/playlists", {
      name:`empty ${playlists.length}`,
      description:`empty ${playlists.length}`,
      imageURL: "https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png",
      userId: 62
    })
    const data = await fetchPlaylists();
    setPlaylists(data);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPlaylists(); // Aguarda a resposta da API
      setPlaylists(data); // Atualiza o estado com os dados retornados
    };

    fetchData();
  }, []);

  const listItems = playlists.map(p => <Playlist playlistID = {p.playlistID} name={p.name} description={p.description} imageURL={p.imageURL} onDelete={deletePlaylist} onEdit={onModalOpen}/>);

  return (

    <div className={styles.main}>
      <div className = {styles.front}>
        <div className = {styles.biblioteca}>
          <h1 className = {styles.bibliotecaName}>
            Biblioteca
          </h1>
        </div>
      </div>
      <div className={styles.playlistsArea}>
        <div className={styles.playlistsNameAndAdd}>
          <h1 className={styles.playlistsName}>
            Playlists
          </h1>
          <button className={styles.addPlaylistButton} onClick={createDummyPlaylist}>
            +
          </button>
        </div>
        <div className={styles.linha}></div>
      </div>
      <div className={styles.playlistsContent}>
          {listItems}
      </div>
      {modalOpenID >= 0 && <PlaylistModal initialData={getPlaylistByID(modalOpenID)} onClose={onModalClose}/>}
    </div>

  );
}