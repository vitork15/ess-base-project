import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./index.module.css";
import User from "/src/shared/assets/user.png";
import Email from "/src/shared/assets/email.png";
import Login from "/src/shared/assets/login.png";
import Password from "/src/shared/assets/password.png";
import Birthday from "/src/shared/assets/birthday-icon.svg"

export default function RegisterPage() {

    const navigate = useNavigate();
    const navigateTo = (path: string) => {
      navigate(path);
    }

    const [user, setUser] = useState({
        name: "",
        login: "",
        email: "",
        password: "",
        birthday: ""
    });

    const replace = (key, value) => 
        {
            // Filtering out properties
            if (value === "") {
              return undefined;
            }
            return value;
        }

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
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user, replace)
            });

            const responseText = await response.text(); // Pega a resposta do servidor
            const responseData = JSON.parse(responseText);
    
            if (!response.ok) throw new Error(responseData.message || "Erro desconhecido");

            setToastMessage("Cadastro feito com sucesso!"); // Define a mensagem do toast
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            setUser({
                name: "",
                login: "",
                email: "",
                password: "",
                birthday: ""
            }); // Resetar formulário

        } catch (error) {
            setToastMessage((error as Error).message); // Define a mensagem do toast
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }  
      };

    return (
        <div className={styles.main}>
            <h1 className={styles.header}>Cadastro</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.card}>
                <div className={styles.inputer}>
                        <img src={User} alt={"Photo"} className={styles.regPhoto}/>
                        <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Nome" required/>
                    </div>
                    <div className={styles.inputer}>
                        <img src={Login} alt={"Photo"} className={styles.regPhoto}/>
                        <input type="text" name="login" value={user.login} onChange={handleChange} placeholder="Login" required/>
                    </div>
                    <div className={styles.inputer}>
                        <img src={Email} alt={"Photo"} className={styles.regPhoto}/>
                        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="E-mail" required/>
                    </div>
                    <div className={styles.inputer}>
                        <img src={Password} alt={"Photo"} className={styles.regPhoto}/>
                        <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Senha" required/>
                    </div>
                    <div className={styles.inputer}>
                        <img src={Birthday} alt={"Photo"} className={styles.regPhoto}/>
                        <input type="string" name="birthday" value={user.birthday} onChange={handleChange} placeholder="Aniversário"/>
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
