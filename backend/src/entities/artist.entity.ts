import {Entity, Column, PrimaryColumn, OneToMany} from "typeorm"
import Album from "./albuns.entity";
import Song from "./songs.entity";

@Entity()
class Artist {

    @PrimaryColumn()
    login: string;

    @Column({nullable: false, unique: true})
    name: string;
    
    @Column({select: false, nullable: false, unique: true})
    email: string;
    
    @Column({nullable: false})
    password: string;
    
    @Column({nullable: true})
    bio?: string;

    @OneToMany(() => Album, album => album.artist, {
        onDelete: "CASCADE"
    })
    albuns: Album[];

    topSongs: Song[];
}

export default Artist