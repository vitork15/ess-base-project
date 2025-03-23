import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./index.module.css";
import User from "/src/shared/assets/user.png";
import Login from "/src/shared/assets/login.png";
import Password from "/src/shared/assets/password.png";
import Birthday from "/src/shared/assets/birthday-icon.svg"

export default function EditPage() {

    const navigate = useNavigate();
    const navigateTo = (path: string) => {
      navigate(path);
    }

    const login = "jeremes"

    interface User {
        name: string,
        login: string,
        password: string,
        birthday: string,
    }
    const [user, setUser] = useState<User>({
        name: "",
        login: "",
        password: "",
        birthday: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            const response = await fetch("http://localhost:5001/users/" + user.login, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            const responseText = await response.text(); // Pega a resposta do servidor
            const responseData = JSON.parse(responseText);
    
            if (!response.ok) throw new Error(responseData.message || "Erro desconhecido");

            setToastMessage("Mudança feita com sucesso!"); // Define a mensagem do toast
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);

        } catch (error) {
            setToastMessage((error as Error).message); // Define a mensagem do toast
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }  
      };

    useEffect(() => {
        fetch(`http://localhost:5001/users/${login}`, {method: 'GET'}) // Ajuste a URL do backend
            .then((response) => {
                if (!response.ok) throw new Error("Usuário não encontrado");
                return response.json();
            })
            .then((data) => {
                setUser(
                {
                    name: data.name,
                    login: data.login,
                    password: data.password,
                    birthday: data.birthday == null ? "" : data.birthday.split('-').reverse().join('/'),
                }
                );
                console.log(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []); // Refaz a requisição quando o login mudar

    return (
        <div className={styles.main}>
            <h1 className={styles.header}>Editar Conta</h1>
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
                        <img src={Birthday} alt={"Photo"} className={styles.regPhoto}/>
                        <input type="string" name="birthday" value={user.birthday} onChange={handleChange} placeholder="Aniversário"/>
                    </div>
                    <button className={styles.buttonwhite} onClick={() => navigateTo('/editpassword')}>
                        <img src={Password} alt={"Photo"} className={styles.regPhoto}/>
                        Alterar Senha
                    </button>
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
