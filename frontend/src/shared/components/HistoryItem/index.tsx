import styles from './index.module.css'
import imagem from '../../assets/album.jpg'


function HistoryItem({name, artist}) {
    return(
        <div className={styles.container}>
            <img src={imagem} alt = "logo"/>
            <p>{name}</p>
            <p>-</p>
            <p>{artist}</p>
        </div>
    )
}

export default HistoryItem