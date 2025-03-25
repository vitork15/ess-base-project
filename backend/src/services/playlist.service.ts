import { DataSource, Repository, In } from "typeorm";
import Playlist from "../entities/playlist.entity";
import dbConn from "../database/postgresConnection";
import User from "../entities/user.entity";
import Category from "../entities/category.entity";
import Song from "../entities/songs.entity";

class PlaylistService{
    playlistRepository: Repository<Playlist>
    userRepository: Repository<User>
    categoryRepository: Repository<Category>
    songRepository: Repository<Song>

    constructor(){
        this.playlistRepository = dbConn.getRepository(Playlist)
        this.userRepository = dbConn.getRepository(User)
        this.categoryRepository = dbConn.getRepository(Category)
        this.songRepository  = dbConn.getRepository(Song)
    }

    async getAllPlaylists() : Promise<Playlist[]>{
        return await this.playlistRepository.find({relations:["user","songs","songs.album"]})
    }

    async insertPlaylist(name:string,description: string, userId: number, imageURL: string) : Promise<Playlist>{
        let userOfPlaylist  = await this.userRepository.findOne({where:{userID:userId}})
        if(!userOfPlaylist){
            throw new Error("user not found!")
        }
        
        let playlist = new Playlist()
        playlist.name = name
        playlist.description = description
        playlist.user = userOfPlaylist
        playlist.saveCount = 0
        playlist.imageURL = imageURL
        
        return await this.playlistRepository.save(playlist)
        
    }

    async getPlaylistById(id:number) : Promise<Playlist>{
        let playlist = await this.playlistRepository.findOne({where:{playlistID:id}, relations: ["user","songs","songs.album"]})
        if(!playlist){
            throw new Error("playlist not found")
        }

        return playlist
    }

    async getAllPlaylistsFromUser(userId:number): Promise<Playlist[]>{
        let user = await this.userRepository.findOne({where:{userID:userId}, relations:["playlists"]})
        if(!user){
            throw new Error("user not found")
        }
        return user.playlists
    }

    async updatePlaylist(id:number, name:string, description:string, categories:number[], saveCount:number, songIds:number[], imageURL:string) : Promise<Playlist> {
        let playlist = await this.playlistRepository.findOne({where:{playlistID:id}, relations:["user", "songs"]})
        let categoryList = await this.categoryRepository.findBy({categoryID : In(categories)})
        if(!playlist){
            throw new Error("playlist not found")
        }
        playlist.name = name
        playlist.description = description
        playlist.saveCount = saveCount
        // let songs = []
        // for (let i = 0; i < songIds.length; i++) {
        //     let song = await this.songRepository.findOne({where:{songID:songIds[i]}})
        //     if(!song){
        //         throw new Error(`song of id ${songIds[i]} was not found`)
        //     }
        //     songs.push(song)
        // }
        playlist.songs = await this.getSongsByIdList(songIds)
        playlist.categories = categoryList
        playlist.imageURL = imageURL
        return await this.playlistRepository.save(playlist)
    }

    async patchPlaylist(id:number, name?:string, description?:string, imageURL?:string, songs?:number[],categories?:number[]) : Promise<Playlist>{
        let playlist = await this.playlistRepository.findOne({where:{playlistID:id}})
        if(!playlist){
            throw new Error("playlist not found")
        }
        if(name){
            playlist.name = name
        }
        if(description){
            playlist.description = description
        }
        if(imageURL){
            playlist.imageURL = imageURL
        }
        if(songs){
            // let songList = []
            // for(let i=0;i<songs.length;i++){
            //     let song = await this.songRepository.findOne({where:{songID:songs[i]}})
            //     if(!song){
            //         throw new Error(`song of id ${songs[i]} was not found`)
            //     }
            //     songList.push(song)
            // }
            playlist.songs = await this.getSongsByIdList(songs)
        }
        if(categories){
            let categoriesList = await this.categoryRepository.findBy({categoryID : In(categories)})
            playlist.categories = categoriesList
        }
        return await this.playlistRepository.save(playlist)
    }

    async deletePlaylist(id:number) : Promise<Playlist> {
        let playlist = await this.playlistRepository.findOne({where:{playlistID:id}, relations:["user","songs"]})
        if(!playlist){
            throw new Error("playlist not found!")
        }
        await this.playlistRepository.delete(playlist.playlistID)
        return playlist
        
    }

    async getSongsByIdList(songIds:number[]): Promise<Song[]> {
        let songs = []
        for (let i = 0; i < songIds.length; i++) {
            let song = await this.songRepository.findOne({where:{songID:songIds[i]}})
            if(!song){
                throw new Error(`song of id ${songIds[i]} was not found`)
            }
            songs.push(song)
        }

        return songs
    }


}

export default PlaylistService