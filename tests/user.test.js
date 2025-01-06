const request = require('supertest');
const { app, startServer, stopServer } = require('../src/index');
const { sequelize, User } = require('.././models');

describe('GET /users', () => {
  let server;

  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Reset database schema
    server = await startServer();
  });

  afterAll(async () => {
    await sequelize.truncate({ cascade: true }); // Clean up all tables
    await stopServer(server);
  });

  it('should return a list of users', async () => {
    await User.create({
      name: 'John Doe',
      mobile: '1234567890',
      address: '123 Test St',
      postCount: 0,
    });

    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
  });

  it('should handle server errors gracefully', async () => {
    jest.spyOn(User, 'findAll').mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/users');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Database error');
  });
});
