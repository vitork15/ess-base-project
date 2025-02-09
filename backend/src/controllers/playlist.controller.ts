import PlaylistService from "../services/playlist.service";
import { Request, Response } from "express";

class PlaylistController {
    playlistService: PlaylistService

    constructor(){
        this.playlistService = new PlaylistService()
    }


    async getAll(req: Request, res: Response){
        if(req.query.userId){
            let userId = parseInt(req.query.userId as string)
            let playlists = null
            try{
                playlists = await this.playlistService.getAllPlaylistsFromUser(userId)
                console.log(playlists)
            }catch(error){
                const message = error instanceof Error ? error.message : "ERRO"
                return res.status(400).json(message)
            }
            return res.status(200).json(playlists)
        }
        let playlists = await this.playlistService.getAllPlaylists()
        return res.status(200).json(playlists)
    }

    async getById(req: Request, res: Response){
        const id = parseInt(req.params.id)
        let playlist = null
        try{
            playlist = await this.playlistService.getPlaylistById(id)
        }catch(error){
            const message = error instanceof Error ? error.message : "ERRO"
            return res.status(404).json(message)
        }

        return res.status(200).json(playlist)
        
    }

    async createPlaylist(req: Request, res: Response){
        let userId =  req.body.userId
        let description = req.body.description

        let playlistInserted = null
        try{
            playlistInserted = await this.playlistService.insertPlaylist(description,userId)
        }catch(error){
            const message = error instanceof Error ? error.message : "ERRO"
            return res.status(400).json(message)
        }

        return res.status(201).json(playlistInserted)
    }

    async deletePlaylist(req: Request, res: Response){
        let id = parseInt(req.params.id)
        let playlist = null
        try {
            playlist = await this.playlistService.deletePlaylist(id)
        } catch (error) {
            const message = error instanceof Error ? error.message : "ERRO"
            return res.status(400).json(message)
        }
        return playlist
    }

    
}

export default PlaylistController