import { loadFeature, defineFeature } from "jest-cucumber";
import supertest from 'supertest';
import app from '../../src/app';
import dbConn from '../../src/database/postgresConnection';
import Song from '../../src/entities/songs.entity';
import Artist from '../../src/entities/artist.entity';

const feature = loadFeature('../features/emAltaService.feature');
const request = supertest(app);

beforeAll( async () => {
    const sleep = (ms : number) => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(1000);
});

afterAll( async () => {
    const queryRunner = dbConn.createQueryRunner();
    // Obtém todas as entidades do dataSource
    const entities = dbConn.entityMetadatas

    for (const entityMetadata of entities) {
    const tableName = entityMetadata.tableName;
    await queryRunner.query(`DELETE FROM "${tableName}"`);
    }
    await dbConn.destroy();
});

defineFeature(feature, async (test) => {

    let response: supertest.Response;

    let mockedSong = new Song();

    let mockedArtist = new Artist();
    mockedArtist.name = "Bells";
    mockedArtist.login = "bells1";
    mockedArtist.password = "bells1";
    mockedArtist.email = "bells@hotmail.com"
    mockedArtist.bio = "Arrastando multidões ao som do pop-reagge";

    const album_data = {
        genero: "pop",
        subgenero: "reaggue",
        name: "A guerra dos grilos e libélulas",
        songs: ["A rainha dos macacos vermelhos","Selva amada","A deusa nua da lua","Memórias de Lana", "Dia de sol","Morrer ou matar","Dança das pétalas","grilos e libélulas","Nenhuma guerra termina bem"],
        songs_paths: ["/Agdgel1","/Agdgel2","/Agdgel3","/Agdgel4","/Agdgel5","/Agdgel6","/Agdgel7","/Agdgel8","/Agdgel9"],
        artist_login: "bells1",
        "feat": ""
    };
    const album_data2 = {
        genero: "mpb",
        subgenero: "",
        name: "Os lamentos de um moinho de vento",
        songs: ["Os lamentos de um moinho de vento"],
        songs_paths: ["/old1mv"],
        artist_login: "bells1",
        "feat": ""
    };
    
    test('Contagem de visualizações', ({given, when, then}) => {

        given(/^a música de id "(.*)" esteja registrada no sistema e retorne "(.*)" como número de visualizações$/, async (arg0, arg1) => {

            const artistRepo = dbConn.getRepository(Artist)
            artistRepo.save(mockedArtist)

            response = await request.post(`/albums`).send(album_data);

            expect(response.status).toBe(201);
            console.log(response.body);

            response = await request.get(`/albumsongs/${response.body.albumID}`).send(album_data);
            
            let songjson = response.body; 
            mockedSong.songID = songjson[0].songID;
            mockedSong.views = songjson[0].views;
        });

        when(/^o usuário faz a requisição especifica da música de id "(.*)"$/,async(arg0) => {
            response = await request.get(`/songs/${mockedSong.songID}`);
            expect(response.status).toBe(200);
        });

        then(/^a música passa a conter "(.*)" visualizações$/,async(arg0, arg1) => {
            expect(response.body.views).toBe(mockedSong.views+1);
        });

    });

   test('Poucas músicas no sistema', ({ given, and, when, then }) => {

        given(/^o usuário acessou na página em alta$/,async() => {

        });
        
        and(/^não haja músicas suficientes no sistema$/,async() => {  
            response = await request.get(`/songs`);
            console.log(response.body);
            expect(response.status).toBe(200);

            expect(response.body.length).toBeLessThan(10);
        });

        when(/^o sistema faz a requisição das músicas mais populares$/,async() => {
            response = await request.get(`/topsongs`);
        });

        then(/^o servidor retorna uma mensagem com status negativo$/,async() => {
            expect(response.status).toBe(210);
        });
    });


    test('Carregar músicas em alta', ({given, and, when, then}) => {

        given(/^o usuário acessou na página em alta$/, async()=> {

        });

        and(/^há músicas suficientes no sistema$/,async() => {
            response = await request.post(`/albums`).send(album_data2);
            response = await request.get(`/songs`);
            console.log(response.body);
            expect(response.status).toBe(200);

            expect(response.body.length).toBeGreaterThan(9);
        });

        when(/^o sistema faz a requisição das músicas mais populares$/,async() => {
            response = await request.get(`/topsongs`);
        });
        
        then(/^o servidor retorna uma mensagem confirmando a pesquisa e uma lista com as músicas$/,async() => {
            expect(response.status).toBe(200);
        });
    });
});
