import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Playlist from "./playlist.entity";

@Entity()
class User{
    @PrimaryGeneratedColumn()
    userID: number

    @Column({nullable:false, unique: true})
    login: string

    @Column({nullable:false})
    name: string

    @Column({nullable:false, unique:true})
    email: string

    @Column({nullable:false})
    password: string

    @Column()
    birthday: Date
    
    @OneToMany(() => Playlist, (playlist) => playlist.user)
    playlists: Playlist[]

}

export default User
