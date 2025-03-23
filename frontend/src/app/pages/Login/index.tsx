import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./index.module.css";
import Login from "/src/shared/assets/login.png";
import Password from "/src/shared/assets/password.png";

export default function LoginPage() {

    const navigate = useNavigate();
    const navigateTo = (path: string) => {
      navigate(path);
    }

    const [user, setUser] = useState({
        login: "",
        password: "",
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
            const response = await fetch("http://localhost:5001/users", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            const responseText = await response.text(); // Pega a resposta do servidor
            const responseData = JSON.parse(responseText);
    
            if (!response.ok) throw new Error(responseData.error || "Erro desconhecido");

            setToastMessage(responseData.message); // Define a mensagem do toast
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            setUser({login: "", password: ""}); // Resetar formulário

        } catch (error) {
            setToastMessage((error as Error).message); // Define a mensagem do toast
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }  
      };

    return (
        <div className={styles.main}>
            <h1 className={styles.header}>Login</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.card}>
                    <div className={styles.inputer}>
                        <img src={Login} alt={"Photo"} className={styles.regPhoto}/>
                        <input type="text" name="login" value={user.login} onChange={handleChange} placeholder="Login" required/>
                    </div>
                    <div className={styles.inputer}>
                        <img src={Password} alt={"Photo"} className={styles.regPhoto}/>
                        <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Senha" required minLength={6}/>
                    </div>
                </div>
                <button className={styles.button} type="submit">Entrar</button>
                <button className={styles.button} type="submit" onClick={() => navigateTo('/register')}>Cadastre-se</button>
                <button className={styles.button} type="submit" onClick={() => navigateTo('/recovery')}>Esqueci a senha</button>
            </form>
            {showToast && (
                <div className={styles.toast}>
                    {toastMessage}
                </div>
            )}
        </div>
    )
}
