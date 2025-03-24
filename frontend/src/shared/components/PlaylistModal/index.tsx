import { useState } from "react";
import styles from "./index.module.css"
import axios from "axios";

export const PlaylistModal = ({initialData, onClose}) => {
    const [formData, setFormData] = useState(initialData);
    console.log(formData)
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const saveData = async () => {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa")
      await axios.patch(`http://localhost:5001/playlists/${initialData.playlistID}`, {
        name: `${formData.name}`,
        description:`${formData.description}`,
        imageURL:`${formData.url}`
      })
    }
  
    const handleSubmit = async () => {
      await saveData()
      await onClose();
    };
  
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
          <div className={styles.buttonContainer}>
            <button onClick={onClose} className={styles.buttonSecondary}>Cancelar</button>
            <button data-cy = "saveModalPL" onClick={handleSubmit} className={styles.buttonPrimary}>Salvar</button>
          </div>
        </div>
      </div>
    );
}