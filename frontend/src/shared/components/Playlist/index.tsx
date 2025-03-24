import { useState, useEffect, useRef } from 'react';
import styles from "./index.module.css";

type PlaylistProps = {
    playlistID:number
    name: string;
    description: string;
    imageURL: string;
    onDelete: (id:number) => void
    onEdit: (id:number) => void
    onOpenSongs: (id:number) => void
};

// Estará dentro da lista de playlists quando entrar na biblioteca
export const Playlist = ({ playlistID, name, description, imageURL, onDelete, onEdit, onOpenSongs}: PlaylistProps) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const toggleMenu = (event : React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
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
        <div data-cy = "playlist" className={styles.card} onClick={() => onOpenSongs(playlistID)}>
            <img src={imageURL} alt={name} className={styles.image} />
            <div className={styles.info}>
                <h3 data-cy = "namePL" className={styles.name}>{name}</h3>
                <p className={styles.description}>{description}</p>
            </div>
            <div data-cy = "optionPL" className={styles.options} onClick={toggleMenu}>&#x22EE;</div>
            {menuVisible && (
                <div className={styles.menu} ref={menuRef}>
                    <button data-cy = "editPL" onClick={(event) => {onEdit(playlistID); event.stopPropagation()}}>Editar</button>
                    <button data-cy = "deletePL" onClick={async (event) => {onDelete(playlistID); event.stopPropagation()}}>Excluir</button>
                </div>
            )}
        </div>
    );
};
