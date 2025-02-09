import { DataSource, Repository } from "typeorm";
import Playlist from "../entities/playlist.entity";
import dbConn from "../database/postgresConnection";
import User from "../entities/user.entity";

class playlistService{
    playlistRepository: Repository<Playlist>
    userRepository: Repository<User>

    constructor(){
        this.playlistRepository = dbConn.getRepository(Playlist)
        this.userRepository = dbConn.getRepository(User)
    }

    async insertPlaylist(description: string, userId: number) : Promise<Playlist>{
        let userOfPlaylist  = await this.userRepository.findOne({where:{userID:userId}})
        if(!userOfPlaylist){
            throw new Error("user not found!")
        }
        
        let playlist = new Playlist()
        playlist.description = description
        playlist.user = userOfPlaylist
        
        return await this.playlistRepository.save(playlist)
        
    }
}