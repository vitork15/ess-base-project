import { DataSource, Repository, EntityManager } from "typeorm";
import Album from "../entities/albuns.entity";
import dbConn from "../database/postgresConnection";
import Song from "../entities/songs.entity";

class AlbumService {
    albumRepository: Repository<Album>;
    songRepository: Repository<Song>

    constructor() {
        this.albumRepository = dbConn.getRepository(Album);
        this.songRepository = dbConn.getRepository(Song);
    }

    async getAllAlbums(): Promise<Album[]> {
        return await this.albumRepository.find();
    }

    async getAlbumById(id: number): Promise<Album> {
        const album = await this.albumRepository.findOne({ where: { albumID: id } });
        if (!album) {
            throw new Error("Album not found");
        }
        return album;
    }

    async insertAlbum(name: string, genero:string, subgenero:string, artist: string, songs: string[], artist_id: number, tipo: string, songs_path: string[]): Promise<Album> {
        
        return await this.albumRepository.manager.transaction(async (transactionalEntityManager: EntityManager) => {

            let album = new Album();
            album.name = name;
            album.artist = artist;
            album.qtd_songs = songs.length;
            album.genero = genero;
            album.subgenero = subgenero;
            album.artist_id = artist_id
            album.tipo = tipo
            album = await this.albumRepository.save(album);

            for (let i = 0; i < songs.length; i++) {
                let musica = new Song();
                musica.name = songs[i];
                musica.album = album; 
                musica.path = songs_path[i];
                musica.artist_id = album.artist_id;
                await transactionalEntityManager.save(Song, musica);
            }

            return album
        });

    }

    async updateAlbum(id: number, name: string, genero: string, subgenero: string, songs: string[], songs_path: string[]): Promise<Album> {
        const album = await this.albumRepository.findOne({ where: { albumID: id }, relations: ["songs"] });
    
        if (!album) {
            throw new Error("Album not found");
        }
    
        album.name = name;
        album.genero = genero;
        album.subgenero = subgenero;
        album.qtd_songs = songs.length;
    
        const updatedSongs = songs.map((song, index) => {
            let musica = album.songs[index];  
    
            if (!musica) {
                musica = new Song();  
            }
    
            musica.name = song;
            musica.path = songs_path[index];  
            musica.album = album;  
    
            return musica;
        });
    
        await this.songRepository.save(updatedSongs);
    
        return await this.albumRepository.save(album);
    }
    

    async deleteAlbum(id: number): Promise<Album> {
        const album = await this.albumRepository.findOne({ where: { albumID: id } });
        if (!album) {
            throw new Error("Album not found");
        }

        await this.albumRepository.delete(album.albumID);
        return album;
    }
}

export default AlbumService;
