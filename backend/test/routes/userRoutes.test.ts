// import { after, afterEach, beforeEach, describe, it} from 'node:test';
// import assert from 'node:assert';
// import request from 'supertest';
// import app from '../../src/index.js';

// describe('User Routes Tests', () => {
//     afterEach(async () => {
//         await request(app).delete('/api/user');
//     });

//     beforeEach(async () => {
//         const users = [
//             { name: 'Alice', score: 10 },
//             { name: 'Bob', score: 15 },
//             { name: 'Charlie', score: 20 },
//             { name: 'Diana', score: 25 },
//             { name: 'Edward', score: 30 },
//             { name: 'Fiona', score: 35 },
//             { name: 'George', score: 40 },
//             { name: 'Hannah', score: 45 },
//             { name: 'Ian', score: 50 },
//             { name: 'Jane', score: 55 },
//         ];

//         for (const user of users) {
//             await request(app).post('/api/user').send(user);
//         }
//     });

//     it('POST /api/user - should create a new user', async () => {
//         const newUser = { name: 'Gary', score: 23 };
//         const response = await request(app)
//             .post('/api/user')
//             .send(newUser)
//             .expect('Content-Type', /json/)
//             .expect(200);
        
//         assert.strictEqual(response.body.status, true, 'User creation failed');
//         assert.strictEqual(response.body.user.name, newUser.name, 'User name does not match');
//         assert.strictEqual(response.body.user.score, newUser.score, 'User score does not match');
//         assert.ok(response.body.user.userId);
//     });

//     it('GET /api/ranking - should retrieve user rankings', async () => {

//         const response = await request(app)
//             .get('/api/ranking')
//             .expect('Content-Type', /json/)
//             .expect(200);

//         assert.strictEqual(response.body.status, true, 'Failed to retrieve user rankings');
//         assert.ok(Array.isArray(response.body.ranking), 'Ranking is not an array');
//         assert.ok(response.body.ranking.length > 0, 'Ranking array is empty');
//     });

//     it('DELETE /api/user - should clear all users', async () => {
//         const response = await request(app)
//             .delete('/api/user')
//             .expect('Content-Type', /json/)
//             .expect(200);

//         assert.strictEqual(response.body.status, true, 'Failed to clear all users');
//     });

//     after(async () => {
//         process.exit(0);
//     });

// });
