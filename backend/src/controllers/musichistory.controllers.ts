import {Request, Response} from 'express';
import MusicHistoryService from '../services/musichistory.service';
import UserService from '../services/user.service';

class MusicHistoryController {
    musicHistoryService: MusicHistoryService;
    userService : UserService

    constructor(){
        this.musicHistoryService = new MusicHistoryService();
        this.userService = new UserService();
    }

    async getAllHistory(req: Request, res: Response) {
        try {
            let history = await this.musicHistoryService.getMusicHistory();
            res.status(200).json(history);

        } catch(error) {
            res.json(error);
        }
    }

    async getHistoryByUserId(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
    
            if(Number.isNaN(id)) {
                res.status(400).json({"message": "invalid input"})
            }

            let data = await this.musicHistoryService.getMusicHistoryByUserId(id);

            if(data) {
                res.status(200).json(data);
            }

            res.status(200).json({"message": "empty list"});


        } catch(error) {
            res.status(400).json(error);
        }
        
        
    } 

    async insertIntoMusicHistory(req: Request, res: Response) {
        try {
            let {userId, musicId} = req.body;
            
            if(!userId || !musicId) {
                console.log("Empty input!");
                res.status(500).json({"message": "empty input"});
            }

            userId = Number(userId);
            musicId = Number(musicId);
            

            const data = await this.musicHistoryService.insertIntoMusicHistory(musicId, userId);
            if(data === null) {
                res.status(500).json({"message": "Invalid Input"});
            }

            res.status(201).json(data);


        } catch(error) {
            res.json(error);
        }
    }

    async deleteMusicHistoryByUserId(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
    
            if(Number.isNaN(id)) {
                res.status(400).json({"message": "invalid input"})
            }

            const flag = await this.musicHistoryService.deleteMusicHistoryByUserId(id);

            if(flag) {
                res.status(200).json({"message": "deleted successfully"});
            }

            res.status(400).json({"message": "invalid input"});

            

        } catch(error) {
            res.json(error);
        }
    }

    async showTop10(req: Request, res: Response) {
        try {
            const result = await this.musicHistoryService.topMusicAndArtists(9);
            console.log(result);
            res.status(200).send(result);

        } catch(error) {
            console.log("Erro no top 10:", error);
            res.json({"message": "error in top 10"});
        }
    }
}

export default MusicHistoryController;