import { Repository } from "typeorm";
import Song from "../entities/songs.entity";
import dbConn from "../database/postgresConnection";
import Album from "../entities/albuns.entity";
import Artist from "../entities/artist.entity";
import Playlist from "../entities/playlist.entity";

interface songInfo{
    name: string;
    artistName: string;
    songId: number;
    cover: string;
    album: number;
}

class SongService {
    songRepository: Repository<Song>;
    albumRepository: Repository<Album>;
    artistRepository: Repository<Artist>;
    playlistRepository: Repository<Playlist>

    constructor() {
        this.songRepository = dbConn.getRepository(Song);
        this.albumRepository = dbConn.getRepository(Album);
        this.playlistRepository =  dbConn.getRepository(Playlist)
    }

    async getSongById(id: number): Promise<Song> {
        const song = await this.songRepository.findOne({where:{songID:id}});
        if (!song) {
            throw new Error("Song not found!");
        }
        song.views += 1;
        song.viewsWeek += 1;
        await this.songRepository.save(song);
        return song;
    }

    async getAllSongs(): Promise<Song[]> {
        return await this.songRepository.find({ relations: ["album"] });
    }

    async deleteSongsByAlbumId(albumId: number, artist_login: string) {
        const album = await this.albumRepository.findOne({ 
            where: { albumID: albumId }, 
            relations: ["artist"] 
        });
    
        if (!album) {
            throw new Error("Album not found");
        }
    
        await this.songRepository.delete({ album: { albumID: albumId } }); 
    }

    async updateSong(songId: number, newName: string, newPath: string): Promise<Song> {
        const song = await this.songRepository.findOne({ where: { songID: songId }, relations: ["album"] });

        if (!song) {
            throw new Error("Song not found");
        }

        song.name = newName;
        song.path = newPath;

        await this.songRepository.save(song);

        return song;
    }

    async getTopSongs(): Promise<songInfo[]> {
        const songs = await this.songRepository.find({
            relations: ["album"],
            order: {
                viewsWeek: "DESC"
            },
            take: 10
        });

        let index = songs.length;
        let topSongs: songInfo[] = new Array(index);
        for (let i = 0; i < index; i++) {
            let album = await this.albumRepository.findOne({
                relations: ["artist"],
                where:{albumID:songs[i].album.albumID}
            });
            topSongs[i] = {
                name: songs[i].name,
                songId: songs[i].songID,
                cover: "https://s2-g1.glbimg.com/f3-LnIxVStkBoUdDeiA6X3hLpZg=/0x0:1600x1306/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/e/7/A0XE2WTVeKcKagPQ0xPw/whatsapp-image-2021-09-21-at-10.20.57.jpeg",
                artistName: album?.artist.name || "Artista desconhecido",
                album: album?.albumID || 0,  
            };  
        }

        return topSongs;
    }

    async getAlbumSongs(albumId: number): Promise<Song[]> {
        const songs = await this.songRepository.find({
            where: { album: { albumID: albumId } }
        });

        return songs;
    }

    async getSongsFromPlaylist(playlistID:number): Promise<Song[]> {
        const playlist = await this.playlistRepository.findOne({where:{playlistID:playlistID}, relations:["songs", "songs.album.artist"]})
        if(!playlist){
            throw new Error("Playlist not found")
        }

        return playlist.songs
    } 
}

export default SongService;