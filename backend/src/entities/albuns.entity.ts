import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import Song from "./songs.entity";
import Artist from "./artist.entity";

@Entity()
class Album {
    @PrimaryGeneratedColumn()
    albumID: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    qtd_songs: number;

    @Column({ nullable: false })
    genero: string;

    @Column({ nullable: true })
    subgenero: string;

    // @Column({ nullable: false })
    // artist: string;

    // @Column({ nullable: false })
    // artist_id: number;

    @Column({ nullable: false })
    tipo: string;

    @ManyToOne(() => Artist, (artist) => artist.albuns)
    artist: Artist

    @OneToMany(() => Song, (song) => song.album)
    songs: Song[];
}

export default Album;
