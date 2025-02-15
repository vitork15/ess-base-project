import { DataSource } from "typeorm";
import User from "../entities/user.entity";
import Playlist from "../entities/playlist.entity";
import Artist from "../entities/artist.entity";

const dbConn = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345678",
    database: "postgres",
    entities: [User,Playlist,Artist],
    synchronize: true,
    logging: true
})


export default dbConn