import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./index.module.css";
import Email from "/src/shared/assets/email.png";

export default function RecoveryPage() {

    const navigate = useNavigate();
    const navigateTo = (path: string) => {
      navigate(path);
    }

    const [user, setUser] = useState({
        email: "",
    });

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
            const response = await fetch("http://localhost:5001/users/recovery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            const responseText = await response.text(); // Pega a resposta do servidor
            const responseData = JSON.parse(responseText);
    
            if (!response.ok) throw new Error(responseData.message || "Erro desconhecido");

            setToastMessage("E-mail enviado para " + user.email); // Define a mensagem do toast
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            setUser({
                email: "",
            }); // Resetar formulário

        } catch (error) {
            setToastMessage((error as Error).message); // Define a mensagem do toast
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }  
      };

    return (
        <div className={styles.main}>
            <h1 className={styles.header}>Recuperação de Senha</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.card}>
                    <div className={styles.inputer}>
                        <img src={Email} alt={"Photo"} className={styles.regPhoto}/>
                        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="E-mail" required/>
                    </div>
                </div>
                <button className={styles.button} type="submit">Recuperar senha</button>
            </form>
            {showToast && (
                <div className={styles.toast}>
                    {toastMessage}
                </div>
            )}
        </div>
    )
}
