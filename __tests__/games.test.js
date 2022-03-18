const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('Hand-of-Resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a game', async () => {
    const game = {
      title: 'star wars battlefront',
      genre: 'shooter',
      price: 1000,
    };
    const res = await request(app).post('/api/v1/games').send(game);
    expect(res.body).toEqual(game);
  });
});
