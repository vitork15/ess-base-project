import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn} from "typeorm";
import User from "./user.entity";

@Entity()
class Playlist{

    @PrimaryGeneratedColumn()
    playlistID:number

    @ManyToOne(() => User, (user) => user.playlists)
    user:User

    @Column()
    description: string

    
}

export default Playlist