import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Playlist from "./playlist.entity";

@Entity()
class User{
    @PrimaryGeneratedColumn()
    userID: number

    @Column({nullable:false})
    name: string
    
    @OneToMany(() => Playlist, (playlist) => playlist.user)
    playlists: Playlist[]

}

export default User
