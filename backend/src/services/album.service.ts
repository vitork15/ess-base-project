import { DataSource, Repository, EntityManager } from "typeorm";
import Album from "../entities/albuns.entity";
import dbConn from "../database/postgresConnection";
import Song from "../entities/songs.entity";
import { plainToClass } from "class-transformer";
import Artist from "../entities/artist.entity";
import ArtistRepository from "../repositories/artist.repository";

class AlbumService {
    albumRepository: Repository<Album>;
    songRepository: Repository<Song>;
    

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

    async insertAlbum(name: string, genero:string, subgenero:string, songs: string[], tipo: string, songs_path: string[], artist_login: string): Promise<Album> {
        
        return await this.albumRepository.manager.transaction(async (transactionalEntityManager: EntityManager) => {

            const artistRepo = new ArtistRepository();
            const artist = await artistRepo.getArtistByLogin(artist_login);
            if (!artist) {
                throw new Error("Artista não encontrado");
            }

            let album = new Album();
            album.name = name;
            album.artist = artist;
            album.qtd_songs = songs.length;
            album.genero = genero;
            album.subgenero = subgenero;
            //album.artist_id = artist_id
            album.tipo = tipo
            album = await this.albumRepository.save(album);

            for (let i = 0; i < songs.length; i++) {
                let musica = new Song();
                musica.name = songs[i];
                musica.album = album; 
                musica.path = songs_path[i];
                //musica.artist_id = album.artist_id;
                await transactionalEntityManager.save(Song, musica);
            }

            return album
        });

    }

    async updateAlbum(id: number, name: string, genero: string, subgenero: string, songs: string[], songs_path: string[], artist_login: string): Promise<Album> {
        const album = await this.albumRepository.findOne({ where: { albumID: id }, relations: ["songs"] });
    
        if (!album) {
            throw new Error("Album not found");
        }
    
        album.name = name;
        album.genero = genero;  
        album.subgenero = subgenero;

        for (let i = 0; i < songs.length; i++) {
            const song = album.songs[i];
    
            song.name = songs[i];
            song.path = songs_path[i];
            //song.artist_id = artist_id;
            await this.songRepository.save(song);
        }

        return await this.albumRepository.save (album);
    }

    async deleteSongFromAlbum(albumId: number, songId: number): Promise<Album> {
        const album = await this.albumRepository.findOne({ where: { albumID: albumId }, relations: ["songs"] });
    
        if (!album) {
            throw new Error("Album not found");
        }
    
        const songIndex = album.songs.findIndex(song => song.songID === songId);
    
        if (songIndex === -1) {
            throw new Error("Song not found in the album");
        }
    
        const [deletedSong] = album.songs.splice(songIndex, 1);
        await this.songRepository.remove(deletedSong);
        album.qtd_songs = album.songs.length;
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
