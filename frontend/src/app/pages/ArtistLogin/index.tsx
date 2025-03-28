import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./index.module.css";
import Login from "/src/shared/assets/login.png";
import Password from "/src/shared/assets/password.png";
import { GlobalContext } from "../../context/GlobalContext";

export default function ArtistLoginPage() {

    const navigate = useNavigate();
    const navigateTo = (path: string) => {
      navigate(path);
    }

    const [artist, setArtist] = useState({
        login: "",
        password: "",
    });

    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const {setIsLogged, setArtistLogin, setIsArtist} = useContext(GlobalContext);

    const handleChange = (event) => {
        const {name, value} = event.target; // Extrai nome e valor do input
        setArtist((prevUser) => ({
            ...prevUser,  // Garante que usa o estado atualizado
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita que a página recarregue
        try {
            const response = await fetch("http://localhost:5001/artists/" + artist.login, {
                method: "GET",
            });

            const responseText = await response.text(); // Pega a resposta do servidor
            const responseData = JSON.parse(responseText);
    
            if (!response.ok) throw new Error(responseData.error || "Erro desconhecido");

            if(responseData.password != artist.password) throw new Error("Senha incorreta"); // Define a mensagem do toast
            else {
                setToastMessage("Login realizado com sucesso"); // Define a mensagem do toast
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
                setArtist({login: "", password: ""}); // Resetar formulário
                setTimeout(() => navigateTo('/home'), 1000);
                setIsArtist(true);
                setIsLogged(true);
                setArtistLogin(artist.login);
            }

        } catch (error) {
            setToastMessage((error as Error).message); // Define a mensagem do toast
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }  
      };

    return (
        <div className={styles.main}>
            <h1 className={styles.header}>Login artista</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.card}>
                    <div className={styles.inputer}>
                        <img src={Login} alt={"Photo"} className={styles.regPhoto}/>
                        <input type="text" name="login" value={artist.login} onChange={handleChange} placeholder="Login" required/>
                    </div>
                    <div className={styles.inputer}>
                        <img src={Password} alt={"Photo"} className={styles.regPhoto}/>
                        <input type="password" name="password" value={artist.password} onChange={handleChange} placeholder="Senha" required minLength={6}/>
                    </div>
                </div>
                <button className={styles.button} type="submit">Entrar</button>
                <button className={styles.regButton} type="submit" onClick={() => navigateTo('/artistregistration')}>Cadastre-se como artista</button>
            </form>
            {showToast && (
                <div className={styles.toast}>
                    {toastMessage}
                </div>
            )}
        </div>
    )
}
