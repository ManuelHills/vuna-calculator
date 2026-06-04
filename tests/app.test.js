// tests/app.test.js
// These tests check that your server works correctly.
// GitHub Actions will run these automatically on every push.

const request = require('supertest');
const app = require('../server');

describe('VUNA Calculator Server', () => {

  // Test 1: The homepage loads
  it('should load the calculator homepage (status 200)', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
  });

  // Test 2: The health check endpoint works
  it('should return health status "ok"', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  // Test 3: The health response contains expected fields
  it('should return app name in health response', async () => {
    const res = await request(app).get('/health');
    expect(res.body.app).toBe('VUNA Calculator');
    expect(res.body.timestamp).toBeDefined();
  });

  // Test 4: Non-existent pages return 404
  it('should return 404 for unknown pages', async () => {
    const res = await request(app).get('/nonexistent-page-xyz');
    expect(res.statusCode).toBe(404);
  });

});
