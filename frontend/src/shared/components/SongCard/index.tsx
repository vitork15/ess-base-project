import styles from "./index.module.css"

type SongCardProps = {
    playlistID:number
    songID:number
    name:string
    views: number
    album: string
    genre: string
    artist: string
    onRemove: (playlistID:number, songID:number) => void
}


export const SongCard = ({playlistID, songID, name, views, album, genre, artist, onRemove} : SongCardProps) => {

    return (
        <div className={styles.card}>
          <button className={styles.closeButton} onClick={async () => onRemove(playlistID,songID)}>×</button>
          <h2 className={styles.title}>{name}</h2>
          <p><strong>Álbum:</strong> {album}</p>
          <p><strong>Gênero:</strong> {genre}</p>
          <p><strong>Artista:</strong> {artist}</p>
          <p className={styles.views}>{views} views</p>
        </div>
    );
};

