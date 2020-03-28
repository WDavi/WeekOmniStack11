/* const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Incidents', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    // TODO: Implement test Function
    //  #It should test creating a ONG, crating an incident and Deleting the incident
    // it('should create a ONG, create a session')
}) */