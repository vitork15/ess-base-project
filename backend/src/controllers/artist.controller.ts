import {Request, Response} from "express";
import ArtistService from "../services/artist.service";

class ArtistController {

    artistRepo: ArtistService;

    constructor(){
        this.artistRepo = new ArtistService()
    }

    async create(req: Request, res: Response) {
        try {
            const {login, name, email, password, bio} = req.body;

            if (!login || !name || !email || !password) {
                return res.status(400).json({message: "Preencha os campos obrigatórios."});
            }
            const artist = await this.artistRepo.createArtist(login, name, email, password, bio);
            return res.status(201).json({message: "Artista cadastrado com sucesso."});
        } catch (error) {
            return res.status(400).json({error: (error as Error).message});
        }
    }

    async getByLogin(req: Request, res: Response) {
        try {
            const {login} = req.params; // Captura o login da URL
            const artist = await this.artistRepo.getArtistByLogin(login);
    
            if (!artist) {
                return res.status(404).json({message: "Artista não encontrado."});
            }
    
            return res.status(200).json(artist);
        } catch (error) {
            return res.status(500).json({error: (error as Error).message});
        }
    }

    async listAll(req: Request, res: Response) {
        try {
            const artists = await this.artistRepo.getAllArtists();
            if (!artists) {
                return res.status(404).json({message: "Não há artistas."});
            }
            return res.json(artists);
        } catch (error) {
            return res.status(500).json({error: "Erro ao buscar artistas."});
        }
    }

    async update(req: Request, res: Response) {
        try {
            const {login} = req.params;
            const artist = await this.artistRepo.updateArtist(login, req.body);
    
            if (!artist) {
                return res.status(404).json({message: "Artista não encontrado."});
            }
    
            return res.status(200).json({message: "Artista atualizado com sucesso."});
        } catch (error) {
            return res.status(400).json({error: (error as Error).message});
        }
    }

    // async delete(req: Request, res: Response) {
    //     const {login} = req.params;
    //     const deleted = await this.artistRepo.deleteArtist(login);
        
    //     if (!deleted) {
    //         return res.status(404).json({error: "Artista não encontrado."});
    //     }
    
    //     return res.status(200).json({message: "Artista deletado com sucesso."});
    // }
}

export default ArtistController;