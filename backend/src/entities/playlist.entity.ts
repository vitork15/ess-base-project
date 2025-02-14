import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn} from "typeorm";
import User from "./user.entity";

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

    
}

export default Playlist