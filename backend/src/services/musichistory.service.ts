import {DataSource, Repository} from "typeorm";
import MusicHistory from '../entities/musichistory.entity'
import User from '../entities/user.entity'
import dbConn from "../database/postgresConnection";
import Song from "../entities/songs.entity";


class MusicHistoryService {
    userRepository: Repository<User>;
    musicHistoryRepository: Repository<MusicHistory>;
    songRepository: Repository<Song>

    constructor() {
        this.userRepository = dbConn.getRepository(User);
        this.musicHistoryRepository = dbConn.getRepository(MusicHistory);
        this.songRepository = dbConn.getRepository(Song);
    }

    async getMusicHistory(): Promise<MusicHistory[]> { //retorna todos a tabela de historico de musicas(todos os usuários)
        return  this.musicHistoryRepository.find({
            relations: {
                usuario: true,
                song: true
            },
            order: {
                createdAt: "DESC"
            }

        });
    }

    async getMusicHistoryByUserId(id: number): Promise<MusicHistory[]> {
        return this.musicHistoryRepository.find({
            relations: {
                usuario: true,
                song: true
            },
            where: {
                usuario: {
                    userID: id
                }
            },
            order: {
                createdAt: "DESC"
            }
        });
    }

    async getMusicHistoryByMusicId(id: number): Promise<Song[]> {
        return this.songRepository.find({
            relations: {
                musicHistory: true
            },
            where: {
                musicHistory: {
                    musicHistoryId: id
                }
            }

        })
    }

    async insertIntoMusicHistory (musicId: number, userId: number): Promise<MusicHistory | null> {
        let song = await this.songRepository.findOne({where: {
            songID: musicId
        }})
        let user = await this.userRepository.findOne({where:
            {userID: userId}
        })

        console.log("Musica encontrada:", song);
        console.log("Usuario Encontrado:", user);

        if(user && song) {
            let data = new MusicHistory();
            data.song = song;
            data.usuario = user;
            return await this.musicHistoryRepository.save(data);
        }
        
        return null

        
    }

    async deleteMusicHistoryByUserId(id: number): Promise<boolean> {
        let user = await this.userRepository.findOne({where:
            {userID: id}
        })

        if(user) {
            await this.musicHistoryRepository.delete({
                usuario: {
                    userID: id
                }
            });
            return true
        }

        return false;
    }

  
    
    
}

export default MusicHistoryService;
