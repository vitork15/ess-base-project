import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Album from "./albuns.entity";

@Entity()
class Song {
    @PrimaryGeneratedColumn()
    songID: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    path: string;

    @Column({ nullable: false })
    artist_id: number;

    @ManyToOne(() => Album, (album) => album.songs)
    album: Album;

    @Column()
    albumID: number;  // Considerando a chave estrangeira para o álbum
}

export default Song;
