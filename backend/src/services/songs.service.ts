import { Repository } from "typeorm";
import Song from "../entities/songs.entity";
import dbConn from "../database/postgresConnection";

class SongService {
    songRepository: Repository<Song>;

    constructor() {
        this.songRepository = dbConn.getRepository(Song);
    }

    async getSongById(id: number): Promise<Song> {
        const song = await this.songRepository.findOne({where:{songID:id}});
        if (!song) {
            throw new Error("Song not found!");
        }
        song.views += 1;
        await this.songRepository.save(song);
        return song;
    }

    async getAllSongs(): Promise<Song[]> {
        return await this.songRepository.find({ relations: ["album"] });
    }
}

export default SongService;