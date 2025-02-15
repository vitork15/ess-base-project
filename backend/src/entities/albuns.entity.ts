import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
class Album {
  
    @PrimaryGeneratedColumn()
    albumID: number;

    @Column({ nullable: false })
    name: string;

    @Column({nullable: false})
    qtd_songs: number;

    @Column({nullable: false})
    genero: string;

    @Column({nullable: true})
    subgenero: string;

    @Column({ nullable: false })
    artist: string;

    @Column({nullable: false})
    artist_id: number;

    @Column({nullable: false})
    tipo: string;

    @Column({ type: "text", array: true, nullable: false })
    songs: string[];

}

export default Album;
