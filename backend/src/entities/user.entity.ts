import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Playlist from "./playlist.entity";

@Entity()
class User{
    @PrimaryGeneratedColumn()
    userID: number
    
    @OneToMany(() => Playlist, (playlist) => playlist.user, {nullable:false})
    playlists: Playlist[]

}

export default User
