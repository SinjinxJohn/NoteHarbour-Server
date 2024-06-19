const request = require('supertest');
// const { expect } = require('chai');
const assert = require('assert');
const app = require('../app'); // Import your express app

describe('Leaky Bucket Rate Limiting', () => {
    it('should allow requests within rate limit', (done) => {
        // Send 5 requests quickly, should all succeed
        let promises = [];
        for (let i = 0; i < 5; i++) {
            promises.push(request(app).get('/').expect(200));
        }
        Promise.all(promises).then(() => done()).catch(done);
    });

    it('should limit requests exceeding rate limit', (done) => {
        // Send 15 requests quickly, some should be rate-limited
        let promises = [];
        for (let i = 0; i < 15; i++) {
            promises.push(request(app).get('/'));
        }
        Promise.all(promises).then((responses) => {
            let rateLimited = responses.filter(res => res.status === 429);
            
            // Print responses
            console.log("Responses:");
            responses.forEach((res, index) => {
                console.log(`Request ${index + 1}: Status ${res.status}`);
            });

            assert.ok(rateLimited.length > 0, 'Expected at least one request to be rate-limited');
            done();
        }).catch(done);
    });
});
