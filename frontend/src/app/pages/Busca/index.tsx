import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './index.module.css';
import axios from 'axios';
import { useState } from 'react';

interface ResultModel{
  name:string
}

export default function SearchPage() {

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [searchQuery,setSearchQuery] = useState("")
  const [filterQuery,setFilterQuery] = useState("")
  const [resultList,setResultList] = useState<ResultModel[]>([])
  const navigate = useNavigate();

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
                  <p>Informações adicionais</p>
                </div>
                <button className={styles.more_options}>&#8942;</button>
              </article>
            ))}
          
        </section>
      </main>
  );
}