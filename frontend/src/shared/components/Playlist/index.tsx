import { useState, useEffect, useRef } from 'react';
import styles from "./index.module.css";
type PlaylistProps = {
    playlistID:number
    name: string;
    description: string;
    imageURL: string;
    onDelete: (id:number) => void
};

// Estará dentro da lista de playlists quando entrar na biblioteca
export const Playlist = ({ playlistID, name, description, imageURL, onDelete }: PlaylistProps) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.card}>
            <img src={imageURL} alt={name} className={styles.image} />
            <div className={styles.info}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.options} onClick={toggleMenu}>&#x22EE;</div>
            {menuVisible && (
                <div className={styles.menu} ref={menuRef}>
                    <button>Editar</button>
                    <button onClick={async () => onDelete(playlistID)}>Excluir</button>
                </div>
            )}
        </div>
    );
};
