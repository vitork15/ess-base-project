import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, PrimaryColumn, JoinTable} from "typeorm";
import User from "./user.entity";
import Category from "./category.entity";

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

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[]
    
}

export default Playlist