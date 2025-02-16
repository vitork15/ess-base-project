import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn, ManyToMany, JoinTable} from "typeorm";
import User from "./user.entity";
import Song from "./songs.entity";

@Entity()
class Playlist{

    @PrimaryGeneratedColumn()
    playlistID:number

    @ManyToOne(() => User, (user) => user.playlists, {nullable:false})
    user:User

    @Column()
    description: string

    @Column({nullable:false})
    saveCount: number

    @ManyToMany(() => Song)
    @JoinTable()
    songs: Song[]

    
}

export default Playlist