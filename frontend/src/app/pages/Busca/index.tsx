import { useNavigate,useSearchParams } from 'react-router-dom';
import styles from './index.module.css';
import axios from 'axios';
import { useState, useContext} from 'react';
import { GlobalContext } from "../../context/GlobalContext";

interface ResultModel{
  name:string
  id: number | string
  type:string
}

interface PlaylistModel {
  playlistID: number;
  name: string;
  description: string;
  saveCount: number;
  imageURL: string;
}

export default function SearchPage() {

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [searchQuery,setSearchQuery] = useState("")
  const [filterQuery,setFilterQuery] = useState("")
  const [resultList,setResultList] = useState<ResultModel[]>([])
  const [menuVisible, setMenuVisible] = useState<boolean[]>([...Array(200)].map(()=>false));
  const [playlists, setPlaylists] = useState<PlaylistModel[]>([]);
  const {userId} = useContext(GlobalContext)

  const navigate = useNavigate();
  console.log(menuVisible)

  const toggleMenu = async (resultId) => {
    let temp = menuVisible
    temp[resultId] = true
    setMenuVisible(temp);
    setPlaylists(await fetchPlaylists())

  };

  const fetchPlaylists = async (): Promise<PlaylistModel[]> => {
    const response = await axios.get<PlaylistModel[]>(`http://localhost:5001/playlists?userId=${userId}`);
    let list:PlaylistModel[] =  response.data;
    list.sort((a,b) => a.playlistID - b.playlistID)
    return list
  };

  const saveSongPlaylist = async (songID,playlist:PlaylistModel) =>{
    
    let response = await axios.get(`http://localhost:5001/songs?playlistID=${encodeURIComponent(playlist.playlistID)}`)
    const songsIDs:number[] = response.data.map((song) => (song.songID))
    songsIDs.push(songID)

    let response2 = await axios.patch(`http://localhost:5001/playlists/${encodeURIComponent(playlist.playlistID)}`,{
      songs: songsIDs
    })

    let temp = menuVisible
    
    setMenuVisible(temp.map(() => false));

  };
  const handleSubmit = async (event) => {
  
    event.preventDefault();
    let newURL;
  
    if(searchQuery == ""){
      newURL= `/search`
    }else if(filterQuery == ""){
      newURL = `/search?ds=${encodeURIComponent(searchQuery)}`
    }else{
      newURL = `/search?ds=${encodeURIComponent(searchQuery)}&filter=${encodeURIComponent(filterQuery)}`
    }
   
    navigate(newURL)
    try {
      const response = await fetch("http://localhost:5001"+newURL, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
      });

      const responseText = await response.text(); // Pega a resposta do servidor
      const responseData = JSON.parse(responseText);
      setResultList(responseData)

      if (!response.ok) throw new Error(responseData.error || "Erro desconhe");

      setToastMessage(responseData.message); // Define a mensagem do toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setSearchQuery("")

    } catch (error) {
      setToastMessage((error as Error).message); // Define a mensagem do toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }  
  };
  
  
  return (
      <main className="content">

        <form onSubmit={handleSubmit}>
          <section className={styles.header} >
            <div className={styles.search_container}>
                <input 
                className={styles.search_container_input} 
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)} 
                type="text" 
                placeholder="Pesquisar..." />
                <button className={styles.search_button} type="submit">&#128269;</button>
            </div>
          </section>

          <section className={styles.results_header}>
          <h2>Resultados</h2>
            <div className="filter">
              <input className={styles.filter_radio} type='radio' name="filter" value="" defaultChecked onChange={(event) => setFilterQuery(event.target.value)}/><label className={styles.label}>Nenhum</label>
              <input className={styles.filter_radio}  type='radio' name="filter" value="song" onChange={(event) => setFilterQuery(event.target.value)}/><label className={styles.label}>Música</label>
              <input className={styles.filter_radio}  type='radio' name="filter" value="playlist" onChange={(event) => setFilterQuery(event.target.value)}/><label className={styles.label}>Playlist</label>
              <input className={styles.filter_radio}  type='radio' name="filter" value="artist" onChange={(event) => setFilterQuery(event.target.value)}/><label className={styles.label}>Artista</label>
            </div>
          </section>
        </form>
        

        
        
        <section className={styles.result_list}>
          
          
            {resultList.map((result) => (
              <article className={styles.result_item}>
                <div className={styles.thumbnail}></div>
                <div className={styles.info}>
                  <h3>{result.name}</h3>
                  <p>{result.type === "song"? "Música": (result.type === "playlist"? "Playlist": "Artista")}</p>
                </div>
                <button className={styles.more_options} onClick={() => toggleMenu(result.id)}>&#8942;</button>
                {menuVisible[result.id] && result.type === "song" && (
                  <div className={styles.menu}>
                      {playlists.map((playlist) => 
                          <button onClick={() => saveSongPlaylist(result.id, playlist)}>{playlist.name}</button>
                      )}
                  </div>
                )}
              </article>
            ))}
          
        </section>
      </main>
  );
}