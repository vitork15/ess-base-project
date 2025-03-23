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
  const [resultList,setResultList] = useState<ResultModel[]>([])
  const navigate = useNavigate();

  const handleSubmit = async (event) => {

    event.preventDefault();
    let newURL;
    
    if(searchQuery == ""){
      newURL= `/search`
    }else{
      newURL = `/search?ds=${encodeURIComponent(searchQuery)}`
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

        <form className={styles.header} onSubmit={handleSubmit}>
          <div className={styles.search_container}>
              <input 
              className={styles.search_container_input} 
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)} 
              type="text" 
              placeholder="Pesquisar..." />
              <button className={styles.search_button} type="submit">&#128269;</button>
          </div>
        </form>

        <section className={styles.results_header}>
          <h2>Resultados</h2>
          <div className="filter">
            <button className={styles.filter_button}>Música</button>
            <button className={styles.filter_button}>Playlist</button>
            <button className={styles.filter_button}>Artista</button>
          </div>
        </section>
        
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