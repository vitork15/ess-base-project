import { Request, Response } from "express";
import AlbumService from "../services/album.service";
import SongService from "../services/songs.service";

class AlbumController {
    private albumService = new AlbumService();
    private songService = new SongService();

    async getAll(req: Request, res: Response) {
        try {
            const albums = await this.albumService.getAllAlbums();
            return res.status(200).json(albums);
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const album = await this.albumService.getAlbumById(id);
            return res.status(200).json(album);
        } catch (error) {
            return this.handleError(res, error, 404);
        }
    }

    async createAlbum(req: Request, res: Response) {
        try {
            const { name, genero, subgenero, songs, songs_paths, artist_login, feat } = req.body;
            if (!name || !songs || !genero || !artist_login || !songs_paths) {
                return res.status(400).json({ message: "Missing required fields!" });
            }

            const fullName = feat ? `${name} (feat. ${feat})` : name;
            const tipo = this.getAlbumType(songs.length);
            
            const albumInserted = await this.albumService.insertAlbum(fullName, genero, subgenero, songs, tipo, songs_paths, artist_login);
            return res.status(201).json(albumInserted);
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    async deleteAlbum(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { artist_login } = req.body;

            await this.songService.deleteSongsByAlbumId(id, artist_login);
            const album = await this.albumService.deleteAlbum(id);
            return res.status(200).json(album);
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    async updateAlbum(req: Request, res: Response) {
        try {
            const { name, genero, subgenero, songs, songs_path, artist_login } = req.body;
            const id = parseInt(req.params.id);
            const songNames = songs.map((song: { name: string }) => song.name);
            
            const album = await this.albumService.updateAlbum(id, name, genero, subgenero, songNames, songs_path);
            return res.status(200).json(album);
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    async deleteSongFromAlbum(req: Request, res: Response) {
        try {
            const albumId = parseInt(req.params.albumId);
            const songId = parseInt(req.params.songId);
            const { artist_login } = req.body;
            
            await this.albumService.deleteSongFromAlbum(albumId, songId, artist_login);
            return res.status(200).json({ message: "Song deleted successfully." });
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    private getAlbumType(songCount: number): string {
        if (songCount === 1) return "Single";
        if (songCount === 2) return "Double Single";
        if (songCount <= 5) return "EP";
        return "Álbum";
    }

    private handleError(res: Response, error: unknown, statusCode = 400) {
        const message = error instanceof Error ? error.message : "An unexpected error occurred.";
        return res.status(statusCode).json({ message });
    }
}

export default AlbumController;
