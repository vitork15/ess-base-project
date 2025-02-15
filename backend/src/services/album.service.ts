import { DataSource, Repository } from "typeorm";
import Album from "../entities/albuns.entity";
import dbConn from "../database/postgresConnection";
import User from "../entities/user.entity"; 

class AlbumService {
    albumRepository: Repository<Album>;

    constructor() {
        this.albumRepository = dbConn.getRepository(Album);
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

    async insertAlbum(name: string, genero:string, subgenero:string, artist: string, songs: string[], artist_id: number, tipo: string): Promise<Album> {
        let album = new Album();
        album.name = name;
        album.artist = artist;
        album.songs = songs;
        album.qtd_songs = songs.length;
        album.genero = genero;
        album.subgenero = subgenero;
        album.artist_id = artist_id
        album.tipo = tipo
        return await this.albumRepository.save(album);

    }

    async updateAlbum(id: number, name: string, genero: string, subgenero: string, songs: string[]): Promise<Album> {
        const album = await this.albumRepository.findOne({ where: { albumID: id } });
        if (!album) {
            throw new Error("Album not found");
        }

        album.name = name;
        album.songs = songs;
        album.genero = genero;
        album.subgenero = subgenero;
        album.qtd_songs = songs.length;

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
