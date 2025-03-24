import styles from './index.module.css'
import HistoryItem from '../../../shared/components/HistoryItem'
import { useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'


interface MusicHistoryItem {
    songName: string;
    authorName: string;
}

function Historico() {
    const { login } = useParams<{ login: string }>();  // Captura o parâmetro userId da URL
    const navigate = useNavigate();
    const [musicHistory, setMusicHistory] = useState<MusicHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (login) {
        fetch(`http://localhost:5001/musichistory/${login}`)
          .then(response => response.json())
          .then(data => {
            const sortedData = data.sort((a, b) => b.musicHistoryId - a.musicHistoryId);
            const mappedData = sortedData.map(item => ({
              songName: item.song.name,
              authorName: item.usuario.name
            }));
            setMusicHistory(mappedData);
            setLoading(false);
          })
          .catch(error => {
            console.error('Erro:', error);
            setLoading(false);
          });
      }
    }, [login]);

    const handleDelete = async () => {
        if (login) {
          await fetch(`http://localhost:5001/musichistory/${login}`, {
            method: 'DELETE',
          })
            .then(response => {
              if (response.ok) {
                alert('Histórico deletado com sucesso!');
                
                setMusicHistory([]);
              } else {
                alert('Erro ao deletar histórico.');
              }
            })
            .catch(error => {
              console.error('Erro ao deletar:', error);
              alert('Erro ao deletar histórico.');
            });
        }
      };

      const handleTop10Redirect = () => {
        if (login) {
            navigate(`/top10/${login}`); // Redireciona para a URL desejada
        }
    };
  
    if (loading) {
      return <p>Loading...</p>;
    }
  

    return(
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.titlebox}>
                    <p>Histórico</p>
                </div>
            </div>
            <div className={styles.historycontainer} id="historicocontainer">
            {musicHistory.map((item, index) => (
                <HistoryItem key={index} name={item.songName} artist={item.authorName} />
            ))}
            </div>
            <div className={styles.footer}>
                  <button onClick={handleDelete} id="delete" className={styles.apagarHistorico}>Deletar</button>
                  <button onClick={handleTop10Redirect} className={styles.maisEscutados}>Mais Escutados</button>
            </div>
        </div>
    )
}

export default Historico