import styles from './index.module.css'

function Top10Item({num, name, artist}) {

    return(
    <div className={styles.container}>
        <p>{num}.</p>
        <p>{name}</p>
        <p>{artist}</p>

    </div>)
}

export default Top10Item;