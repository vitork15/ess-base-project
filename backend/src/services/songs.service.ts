import { Repository } from "typeorm";
import Song from "../entities/songs.entity";
import dbConn from "../database/postgresConnection";

class SongService {
    songRepository: Repository<Song>;

    constructor() {
        this.songRepository = dbConn.getRepository(Song);
    }

    async getAllSongs(): Promise<Song[]> {
        return await this.songRepository.find({ relations: ["album"] });
    }

    async deleteSongsByAlbumId(albumId: number) {
        await this.songRepository.delete({ album: { albumID: albumId } }); 
    }

    async updateSong(songId: number, newName: string, newPath: string): Promise<Song> {
        const song = await this.songRepository.findOne({ where: { songID: songId }, relations: ["album"] });

        if (!song) {
            throw new Error("Song not found");
        }

        song.name = newName;
        song.path = newPath;

        await this.songRepository.save(song);

        return song;
    }
}

export default SongService;