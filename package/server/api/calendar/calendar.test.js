const server = require('../../server');
const request = require('supertest');


describe('GET /api/calendar', () => {
    it('returns timeslots', async () => {
        const req = await request(server)
            .get('/api/calendar')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(req.body.timeslots).toBeDefined()
    });
});