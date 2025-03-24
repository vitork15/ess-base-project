import {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import ArtistPhoto from "/src/shared/assets/artist.svg";
import Birthday from "/src/shared/assets/birthday-icon.svg"
import EditPhoto from "/src/shared/assets/edit.png"

export default function UserPage() {
    // Dados mockados para testar o layout
    const {login} = useParams();

    const navigate = useNavigate();
    const navigateTo = (path: string) => {
      navigate(path);
    }

    interface User {
        name: string,
        login: string,
        email: string,
        password: string,
        birthday: string,
        userID: string
    }
    const [user, setUser] = useState<User>({
        name: "",
        login: "",
        email: "",
        password: "",
        birthday: "",
        userID: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch(`http://localhost:5001/users/${login}`, {method: 'GET'}) // Ajuste a URL do backend
            .then((response) => {
                if (!response.ok) throw new Error("Usuário não encontrado");
                return response.json();
            })
            .then((data) => {
                setUser(data);
                console.log(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [login]); // Refaz a requisição quando o login mudar

    if (user.login == "") return <p>Usuário não encontrado</p>;

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h1 className={styles.name}>{user.name}</h1>
                <button className={styles.edit} onClick={() => navigateTo('/edit')}>
                    <img src={EditPhoto} alt={"Edit"} className={styles.editimage} />
                    Editar
                </button>
            </div>
            <div className={styles.body}>
                <div className={styles.options}>
                    <div className={styles.card}>
                        <img src={ArtistPhoto} alt={"Photo"} className={styles.photo} />
                        <div className={styles.login}>@{user.login}</div>
                        <div className={styles.info}>
                            <img src={Birthday} alt={"Photo"} className={styles.infoimage}/>
                            {
                            user.birthday == null
                            ? "Não informado"
                            : user.birthday.split('-').reverse().join('/')
                            }
                        </div>
                    </div>
                    <button className={styles.button} onClick={() => navigateTo('/recovery')}>Histórico de Playlists</button>
                    <button className={styles.button} onClick={() => navigateTo(`/historico/${login}`)}>Histórico de Músicas</button>
                    <button className={styles.button} onClick={() => navigateTo(`/top10/${login}`)}>Mais Escutadas</button>
                </div>
            </div>
        </div>
    );
};