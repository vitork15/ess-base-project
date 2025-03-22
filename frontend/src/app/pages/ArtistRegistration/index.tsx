import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import styles from "./index.module.css";

const ArtistRegistrationPage = () => {

    const [artist, setArtist] = useState({
        name: "",
        login: "",
        email: "",
        password: "",
        bio: ""
    });

    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [isLogged, setIsLogged] = useState(true);

    const handleChange = (event) => {
        const {name, value} = event.target; // Extrai nome e valor do input
        setArtist((prevArtist) => ({
            ...prevArtist,  // Garante que usa o estado atualizado
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita que a página recarregue
        try {
            const response = await fetch("http://localhost:5001/artists", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(artist)
            });

            const responseText = await response.text(); // Pega a resposta do servidor
            const responseData = JSON.parse(responseText);
    
            if (!response.ok) throw new Error(responseData.error || "Erro desconhe");

            setToastMessage(responseData.message); // Define a mensagem do toast
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            setArtist({ name: "", login: "", email: "", password: "", bio: ""}); // Resetar formulário

        } catch (error) {
            setToastMessage((error as Error).message); // Define a mensagem do toast
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }  
      };

    return (
        <div className={styles.main}>
            <h1 className={styles.header}>Cadastrar artista</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.card}>
                    <div className={styles.inputer}>
                        <p>👤</p>
                        <input type="text" name="name" value={artist.name} onChange={handleChange} placeholder="Nome" required/>
                    </div>
                    <div className={styles.inputer}>
                        <p>🆔</p>
                        <input type="text" name="login" value={artist.login} onChange={handleChange} placeholder="Login" required/>
                    </div>
                    <div className={styles.inputer}>
                        <p>📧</p>
                        <input type="email" name="email" value={artist.email} onChange={handleChange} placeholder="E-mail" required/>
                    </div>
                    <div className={styles.inputer}>
                        <p>🔒</p>
                        <input type="password" name="password" value={artist.password} onChange={handleChange} placeholder="Senha" required/>
                    </div>
                </div>
                <button className={styles.button} type="submit">Cadastrar</button>
            </form>
            {showToast && (
                <div className={styles.toast}>
                    {toastMessage}
                </div>
            )}
        </div>
    )
}

export default ArtistRegistrationPage;