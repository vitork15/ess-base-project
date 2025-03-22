import dbConn  from "../database/postgresConnection";
import { Repository } from "typeorm";
import Artist from "../entities/artist.entity";

class ArtistService {
    private repo: Repository<Artist>;

    constructor() {
        this.repo = dbConn.getRepository(Artist);
    }

    async createArtist(login: string, name: string, email: string, password: string, bio: string): Promise<Artist> {

        let login_R = await this.repo.findOne({where: {login:login}});
        if (login_R) {
            throw new Error("Login já em uso.")
        }
        let name_R = await this.repo.findOne({where: {name:name}});
        if (name_R) {
            throw new Error("Nome já em uso.")
        }
        let email_R = await this.repo.findOne({where: {email:email}});
        if (email_R) {
            throw new Error("E-mail já em uso.")
        }
        const artistData = new Artist();
        artistData.login = login;
        artistData.name = name;
        artistData.email = email;
        artistData.password = password;
        artistData.bio = bio;
        const artist = this.repo.create(artistData);
        return this.repo.save(artist);
    }

    async getAllArtists(): Promise<Artist[]> {
        return this.repo.find();
    }

    async getArtistByLogin(login: string): Promise<Artist> {
        let artist = await this.repo.findOne({where: { login: login }, relations: ["albuns"], });
        if(!artist){
            throw new Error("Artista não encontrado.")
        }

        return artist
    }

    async updateArtist(curr_login: string, data: Partial<Artist>) : Promise<Artist> {
        const artist = await this.repo.findOne({where: {login:curr_login}});

        if(!artist){
            throw new Error("Artista não encontrado.")
        }
        const {login, name, email, password, bio} = data;
        if (login){
            let teste = await this.repo.findOne({where: {login: login}});
            if (teste){
                throw new Error("Login já em uso.")
            }
        }
        if (name){
            let teste = await this.repo.findOne({where: {name: name}});
            if (teste){
                throw new Error("Nome já em uso.")
            }
        }
        if (email){
            let teste = await this.repo.findOne({where: {email: email}});
            if (teste){
                throw new Error("E-mail já em uso.")
            }
        }
        Object.assign(artist, data); // Atualiza os campos fornecidos
        return await this.repo.save(artist);
    }

    async deleteArtist(login: string) : Promise<boolean>{
        const result = await this.repo.delete({login:login});
        return result.affected != 0;
    }
}

export default ArtistService;