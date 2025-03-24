import styles from './index.module.css'
import Top10Item from '../../../shared/components/Top10Item'
import { useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'

function Top10() {
    const { login } = useParams<{ login: string }>();  // Captura o parâmetro userId da URL
    const navigate = useNavigate();

    const [top10, setTop10] = useState<{ posicao: number; nome: string; artist_login: string | null }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTop10 = async () => {
            try {
                const response = await fetch(`http://localhost:5001/top10/${login}`); // Faz a requisição para o endpoint com o login do usuário
                if (!response.ok) {
                    throw new Error('Erro ao buscar o Top 10');
                }
                const data = await response.json();
                setTop10(data);
            } catch (err) {
                if (err instanceof Error) {  
                    setError(err.message);  
                } else {
                    setError('Erro desconhecido');  
                }
            } finally {
                setLoading(false);
            }
        };

        if (login) {
            fetchTop10();
        }
    }, [login]);


    const goToMusicHistoryHandler = () => {
        if (login) {
            navigate(`/historico/${login}`); 
        } 
    }

    if (loading) {
        return <div>Carregando...</div>;  
    }

    if (error) {
        return <div>Erro: {error}</div>;  
    }
    

    return(
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.titlebox}>
                    <p>Top 10</p>
                </div>
            </div>
            <div className={styles.classification}>
                <p>Num</p>
                <p>Musica</p>
                <p>Artista</p>
            </div>
            <div className={styles.historycontainer}>
            {top10.map((item) => (
                    <Top10Item
                        key={item.posicao}
                        num={item.posicao}
                        name={item.nome}
                        artist={item.artist_login || "Desconhecido"}
                    />
                ))}
            </div>
            <div className={styles.footer}>
                  <button onClick = {goToMusicHistoryHandler} className={styles.maisEscutados}>Voltar</button>
            </div>

        </div>
    )
}

export default Top10