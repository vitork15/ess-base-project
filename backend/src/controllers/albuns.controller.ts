import { Request, Response } from "express";
import AlbumService from "../services/album.service";

class AlbumController {
    albumService: AlbumService;

    constructor() {
        this.albumService = new AlbumService();
    }

    async getAll(req: Request, res: Response) {
        let albums = await this.albumService.getAllAlbums();
        return res.status(200).json(albums);
    }

    async getById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        let album = null;

        try {
            album = await this.albumService.getAlbumById(id);
        } catch (error) {
            const message = error instanceof Error ? error.message : "ERRO";
            return res.status(404).json(message);
        }

        return res.status(200).json(album);
    }

    async createAlbum(req: Request, res: Response) {
        const { name, genero, subgenero, artist, songs, artist_id } = req.body;

        if (!name || !artist || !songs || !genero || !artist_id) {
            return res.status(400).json("Missing required fields or invalid format!");
        }

        let albumInserted = null;
        let tipo = "";

        if (songs.length === 1) {
            tipo = "Single";
        } else if (songs.length === 2) {
            tipo = "Double Single";
        } else if (songs.length <= 5){
            tipo = "EP"
        } else {
            tipo = "Álbum"
        }

        try {
            albumInserted = await this.albumService.insertAlbum(name, genero, subgenero, artist, songs, artist_id, tipo);
        } catch (error) {
            const message = error instanceof Error ? error.message : "ERRO";
            return res.status(400).json(message);
        }

        // Retornando o álbum criado como resposta
        return res.status(201).json(albumInserted);
    }

    async deleteAlbum(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        let album = null;

        try {
            album = await this.albumService.deleteAlbum(id);
        } catch (error) {
            const message = error instanceof Error ? error.message : "ERRO";
            return res.status(400).json(message);
        }

        return res.status(200).json(album);
    }

    async updateAlbum(req: Request, res: Response) {
        const {name, genero, subgenero, songs } = req.body;
        const id = parseInt(req.params.id);
        let album = null;

        try {
            album = await this.albumService.updateAlbum(id, name, genero, subgenero, songs);
        } catch (error) {
            const message = error instanceof Error ? error.message : "ERRO";
            return res.status(400).json(message);
        }

        return res.status(200).json(album);
    }
}

export default AlbumController;
