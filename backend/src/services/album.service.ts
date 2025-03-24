import { Repository, EntityManager } from "typeorm";
import Album from "../entities/albuns.entity";
import dbConn from "../database/postgresConnection";
import Song from "../entities/songs.entity";
import ArtistService from "./artist.service";

class AlbumService {
    private albumRepository: Repository<Album> = dbConn.getRepository(Album);
    private songRepository: Repository<Song> = dbConn.getRepository(Song);

    async getAllAlbums(): Promise<Album[]> {
        return this.albumRepository.find();
    }

    async getAlbumById(id: number): Promise<Album> {
        const album = await this.albumRepository.findOne({ where: { albumID: id }, relations: ["songs"] });
        if (!album) throw new Error("Album not found");
        return album;
    }

    async insertAlbum(name: string, genero: string, subgenero: string, songs: string[], tipo: string, songs_path: string[], artist_login: string): Promise<Album> {
        return this.albumRepository.manager.transaction(async (transactionalEntityManager: EntityManager) => {
            const artist = await new ArtistService().getArtistByLogin(artist_login);
            if (!artist) throw new Error("Artista não encontrado");

            let album = this.albumRepository.create({ name, artist, qtd_songs: songs.length, genero, subgenero, tipo });
            album = await this.albumRepository.save(album);

            const songEntities = songs.map((songName, index) => {
                return this.songRepository.create({ name: songName, album, path: songs_path[index] });
            });
            await transactionalEntityManager.save(Song, songEntities);

            return album;
        });
    }

    async updateAlbum(id: number, name?: string, genero?: string, subgenero?: string, songs?: string[], songs_path?: string[]): Promise<Album> {
        const album = await this.albumRepository.findOne({ where: { albumID: id }, relations: ["songs"] });
        if (!album) throw new Error("Album not found");

        Object.assign(album, { name, genero, subgenero });
        if (songs && songs_path && songs.length !== songs_path.length) throw new Error("Songs and songs_path arrays must have the same length");

        if (songs || songs_path) {
            album.songs.forEach((song, index) => {
                if (songs && songs[index]) song.name = songs[index];
                if (songs_path && songs_path[index]) song.path = songs_path[index];
            });
            await this.songRepository.save(album.songs);
        }

        return this.albumRepository.save(album);
    }

    async deleteSongFromAlbum(albumId: number, songId: number, login: string): Promise<Album> {
        const album = await this.albumRepository.findOne({ where: { albumID: albumId }, relations: ["songs"] });
        if (!album) throw new Error("Album not found");

        const songIndex = album.songs.findIndex(song => song.songID === songId);
        if (songIndex === -1) throw new Error("Song not found in the album");

        await this.songRepository.remove(album.songs[songIndex]);
        album.songs.splice(songIndex, 1);
        album.qtd_songs = album.songs.length;

        return this.albumRepository.save(album);
    }

    async deleteAlbum(id: number): Promise<Album> {
        const album = await this.albumRepository.findOne({ where: { albumID: id } });
        if (!album) throw new Error("Album not found");

        await this.albumRepository.delete(album.albumID);
        return album;
    }
}

export default AlbumService;