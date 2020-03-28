const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "adasd",
                email: "corona@kakak.com",
                whatsapp: "53000000000",
                city: "pelotas",
                uf: "RS"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

    
    it('should create 2 ONGs and receive an array of objects containing the ONGs created', async () => {
        const expectedResponse = [
            {
                id: expect.anything(),
                name: 'lorem',
                email: 'primeira@lorem.com',
                whatsapp: "53000000000",
                city: "pelotas",
                uf: "RS"
            },

            {
                id: expect.anything(),
                name: "Ipsum",
                email: "segunda@ong.com",
                whatsapp: "115544500000",
                city: "São paulo",
                uf: "SP"
            }
        ];

        await request(app)
            .post('/ongs')
            .send({
                name: "lorem",
                email: "primeira@lorem.com",
                whatsapp: "53000000000",
                city: "pelotas",
                uf: "RS"
            });
        
        await request(app)
            .post('/ongs')
            .send({
                name: "Ipsum",
                email: "segunda@ong.com",
                whatsapp: "11554450000",
                city: "São paulo",
                uf: "SP"
            });

        const ongCreationResponse = await request(app)
                .get('/ongs');
            
        expect(ongCreationResponse.body)
            .not.toEqual(expect.arrayContaining(expectedResponse));
    });
});