import { useState , useEffect} from "react";
import styles from "./index.module.css"
import axios from "axios";

export const PlaylistModal = ({initialData, onClose}) => {
    const [formData, setFormData] = useState(initialData);
    const [selecionadas, setSelecionadas] = useState<number[]>([]);


    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const saveData = async () => {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa")
      await axios.patch(`http://localhost:5001/playlists/${initialData.playlistID}`, {
        name: `${formData.name}`,
        description:`${formData.description}`,
        categories:selecionadas,
        imageURL:`${formData.url}`
      })
    }


    const handleSubmit = async () => {
      await saveData()
      await onClose()
    };

  
    // Função chamada ao marcar/desmarcar uma checkbox
    const handleCheckboxChange = (event) => {
      let stringResponse = event.target.value 
      let numberResponse = Number(stringResponse)

      
      if(!selecionadas.includes(numberResponse)){
        selecionadas.push(numberResponse)       
      }else{
        setSelecionadas(selecionadas.filter((item) => item !==numberResponse))
      }
    }

    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h2 className={styles.title}>Editar Informações</h2>
          <input
            data-cy = "modalNamePL"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
          <textarea
            name="description"
            placeholder="Descrição"
            value={formData.description}
            onChange={handleChange}
            className={styles.textarea}
          />
          <input
            name="url"
            placeholder="URL"
            value={formData.url}
            onChange={handleChange}
            className={styles.input}
          />
          <fieldset>
            <input type="checkbox" name="categories" value="0" onChange={handleCheckboxChange} />Rock
            <input type="checkbox" name="categories" value="1" onChange={handleCheckboxChange}/>Brega
            <input type="checkbox" name="categories" value="2" onChange={handleCheckboxChange}/>Funk
            <input type="checkbox" name="categories" value="3" onChange={handleCheckboxChange}/>Eletronica
            <input type="checkbox" name="categories" value="4" onChange={handleCheckboxChange}/>Musica de verão
          </fieldset>
          <div className={styles.buttonContainer}>
            <button onClick={onClose} className={styles.buttonSecondary}>Cancelar</button>
            <button data-cy = "saveModalPL" onClick={handleSubmit} className={styles.buttonPrimary}>Salvar</button>
          </div>
        </div>
      </div>
    );
}