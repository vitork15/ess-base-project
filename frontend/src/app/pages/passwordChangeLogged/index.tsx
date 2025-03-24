import {useContext, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import styles from "./index.module.css";
import Password from "/src/shared/assets/password.png";
import { GlobalContext } from "../../context/GlobalContext";

export default function PasswordChangeLoggedPage() {

    const navigate = useNavigate();
    const navigateTo = (path: string) => {
      navigate(path);
    }

    const [user, setUser] = useState({
        password: "",
    });

    const {userLogin} = useContext(GlobalContext)

    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleChange = (event) => {
        const {name, value} = event.target; // Extrai nome e valor do input
        setUser((prevUser) => ({
            ...prevUser,  // Garante que usa o estado atualizado
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita que a página recarregue
        try {
            const response = await fetch("http://localhost:5001/users/" + userLogin, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            const responseText = await response.text(); // Pega a resposta do servidor
            const responseData = JSON.parse(responseText);
    
            if (!response.ok) throw new Error(responseData.message || "Erro desconhecido");

            setToastMessage("Senha modificada com sucesso"); // Define a mensagem do toast
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            setUser({
                password: "",
            }); // Resetar formulário

        } catch (error) {
            setToastMessage((error as Error).message); // Define a mensagem do toast
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }  
      };

    return (
        <div className={styles.main}>
            <h1 className={styles.header}>Editar Senha</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.card}>
                    <div className={styles.inputer}>
                        <img src={Password} alt={"Photo"} className={styles.regPhoto}/>
                        <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Senha" required minLength={6}/>
                    </div>
                </div>
                <button className={styles.button} type="submit">Editar</button>
            </form>
            {showToast && (
                <div className={styles.toast}>
                    {toastMessage}
                </div>
            )}
        </div>
    )
}
