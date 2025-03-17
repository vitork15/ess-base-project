import { loadFeature, defineFeature } from "jest-cucumber";
import supertest from 'supertest';
import app from '../../src/app';
import dbConn from "../../src/database/postgresConnection";
import Artist from "../../src/entities/artist.entity";
import { assert } from "console";
import { notEqual } from "assert";

const feature = loadFeature('../features/ArtistsService.feature');
const request = supertest(app);

defineFeature(feature, (test) => {

    const artistRepo = dbConn.getRepository(Artist)
    let response: supertest.Response;
    let bodyOfRequest = {}

    beforeEach( async () => {
        const queryRunner = dbConn.createQueryRunner();
        // Obtém todas as entidades do dataSource
        const entities = dbConn.entityMetadatas

        for (const entityMetadata of entities) {
            const tableName = entityMetadata.tableName;
            await queryRunner.query(`DELETE FROM "${tableName}"`);
        }

        bodyOfRequest = {}
    })

    beforeAll( async () => {
        const sleep = (ms : number) => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(1000)
    });

    afterAll(async () => {
        await dbConn.destroy()
    })

    test('Cadastro de artista com sucesso', ({ given, and, when, then }) => {
    	given(/^não existe artista com o nome artístico "(.*)"$/, async (arg0) => {
            const artistT = await artistRepo.findOne({where: {name:arg0}})
            expect(artistT).toBeNull()
    	});
    	and(/^não existe artista com o login "(.*)"$/, async (arg0) => {
            const artistT = await artistRepo.findOne({where: {login:arg0}})
            expect(artistT).toBeNull()
    	});
    	and(/^não existe artista com o e-mail "(.*)"$/, async (arg0) => {
            const artistT = await artistRepo.findOne({where: {email:arg0}})
            expect(artistT).toBeNull()
    	});
    	and(/^eu preencho o campo nome artístico com "(.*)"$/, (arg0) => {
            (bodyOfRequest as Artist).name = arg0
    	});
    	and(/^eu preencho o campo login com "(.*)"$/, (arg0) => {
            (bodyOfRequest as Artist).login = arg0
    	});
    	and(/^eu preencho o campo e-mail com "(.*)"$/, (arg0) => {
            (bodyOfRequest as Artist).email = arg0
    	});
    	and(/^eu preencho o campo senha com "(.*)"$/, (arg0) => {
            (bodyOfRequest as Artist).password = arg0
    	});
    	and(/^eu preencho o campo bio com "(.*)"$/, (arg0) => {
            (bodyOfRequest as Artist).bio = arg0
    	});
    	when(/^uma requisição POST é mandada para "(.*)"$/, async (arg0) => {
            response = await request.post(arg0).send(bodyOfRequest)
    	});
    	then(/^a resposta da requisição tem o código "(.*)"$/, (arg0) => {
            expect(response.status).toBe(parseInt(arg0))
    	});
    	and(/^o sistema retorna a mensagem "(.*)"$/, (arg0) => {
            expect(response.body['message']).toBe(arg0)
    	});
    });

    test('Falha na atualização do cadastro de artista', ({ given, and, when, then }) => {
        given(/^existe Artista com o nome artístico preenchido com "(.*)"$/, async (arg0) => {
            const artistT = await artistRepo.findOne({where: {name:arg0}})
            if (!artistT){
                let artist = new Artist();
                artist.login = "a0aergbae"
                artist.email = "existeNome@gmail.com"
                artist.name = arg0
                artist.password = "gbaebar"
                artist.bio = ""
                await artistRepo.save(artist)
            }
        });
        and(/^existe um artista com Login "(.*)"$/, async (arg0) => {
            const artistT = await artistRepo.findOne({where: {login:arg0}})
            if (!artistT){
                let artist = new Artist();
                artist.login = arg0
                artist.email = "existelogin@gmail.com"
                artist.name = "arbar"
                artist.password = "araergbaebar"
                artist.bio = ""
                await artistRepo.save(artist)
            }
        });
        and(/^o campo nome artístico está preenchido com "(.*)"$/, (arg0) => {
            (bodyOfRequest as Artist).name = arg0
        });
        when(/^eu envio uma requisição PATCH para "(.*)"$/, async (arg0) => {
            response = await request.patch(arg0).send(bodyOfRequest)
        });
        then(/^a resposta da requisição tem o código "(.*)"$/, (arg0) => {
            expect(response.status).toBe(parseInt(arg0))
        });
        and(/^o sistema retorna a mensagem "(.*)"$/, (arg0) => {
            expect(response.body['error']).toBe(arg0)
        });
    });

    test('Falha no cadastro de artista por campo obrigatório vazio', ({ given, and, when, then }) => {
        given(/^eu preencho o campo nome artístico com "(.*)"$/, (arg0) => {
            (bodyOfRequest as any).name = arg0
        });
        and('eu preencho o campo login com ""', () => {
            (bodyOfRequest as any).login = ""
        });
        and(/^eu preencho o campo e-mail com "(.*)"$/, (arg0) => {
            (bodyOfRequest as any).email = arg0
        });
        and(/^eu preencho o campo senha com "(.*)"$/, (arg0) => {
            (bodyOfRequest as any).password = arg0
        });
        and(/^eu preencho o campo bio com "(.*)"$/, (arg0) => {
            (bodyOfRequest as any).bio = arg0
        });
        when(/^uma requisição POST é mandada para "(.*)"$/, async (arg0) => {
            response = await request.post(arg0).send(bodyOfRequest)
        });
        then(/^a resposta da requisição tem o código "(.*)"$/, (arg0) => {
            expect(response.status).toBe(parseInt(arg0))
        });
        and(/^o sistema retorna a mensagem "(.*)"$/, (arg0) => {
            expect(response.body['message']).toBe(arg0)
        });
    });

    test('Atualização do cadastro de artista com sucesso', ({ given, and, when, then }) => {
        given(/^não existe Artista com o nome artístico preenchido com "(.*)"$/, async (arg0) => {
            const artistT = await artistRepo.findOne({where: {name:arg0}})
            expect(artistT).toBeNull()
        });
        and(/^existe um artista com Login "(.*)"$/, async (arg0) => {
            const artistT = await artistRepo.findOne({where: {login:arg0}})
            if (!artistT){
                let artist = new Artist();
                artist.login = arg0
                artist.email = "testcucumber@gmail.com"
                artist.name = "arbarol"
                artist.password = "araergbaebar"
                artist.bio = ""
                await artistRepo.save(artist)
            }

        });
        and(/^o campo nome artístico está preenchido com "(.*)"$/, (arg0) => {
            (bodyOfRequest as any).name = arg0
        });
        when(/^eu envio uma requisição PATCH para "(.*)"$/, async (arg0) => {
            response = await request.patch(arg0).send(bodyOfRequest)
        });
        then(/^a resposta da requisição tem o código "(.*)"$/, (arg0) => {
            expect(response.status).toBe(parseInt(arg0))
        });
        and(/^o sistema retorna a mensagem "(.*)"$/, (arg0) => {
            expect(response.body['message']).toBe(arg0)
        });
    });
    
});