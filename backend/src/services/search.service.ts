import { Repository, Like } from "typeorm";
import dbConn from "../database/postgresConnection";
import User from "../entities/user.entity";
import Song from "../entities/songs.entity";
import Artist from "../entities/artist.entity";
import Playlist from "../entities/playlist.entity";

class SearchService{
    userRepository: Repository<User>
    artistRepository: Repository<Artist>
    songRepository: Repository<Song>
    playlistRepository: Repository<Playlist>
    
    constructor(){
        this.userRepository = dbConn.getRepository(User)
        this.artistRepository = dbConn.getRepository(Artist)
        this.songRepository = dbConn.getRepository(Song)
        this.playlistRepository = dbConn.getRepository(Playlist)
    }

    async searchArtist(description:string): Promise<Artist[]>{
        return await this.artistRepository.findBy({name:Like("%"+description+"%")})
    }
    async searchSong(description:string): Promise<Song[]>{
        return await this.songRepository.findBy({name:Like("%"+description+"%")})
    }
    //async searchPlaylist(description:string): Promise<Playlist[]>{
    //    return await this.playlistRepository.findBy({name:Like("%"+description+"%")})
    //}
}
export default SearchService