import { DataSource } from "typeorm";
import User from "../entities/user.entity";
import Playlist from "../entities/playlist.entity";
import Album from "../entities/albuns.entity"

const dbConn = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345678",
    database: "postgres",
    entities: [User,Playlist,Album],
    synchronize: true,
    logging: true
})


export default dbConn