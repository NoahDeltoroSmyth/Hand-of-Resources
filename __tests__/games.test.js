const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Game = require('../lib/models/Game');

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
    expect(res.body).toEqual({ id: expect.any(String), ...game });
  });

  it('finds game by id', async () => {
    const game = await Game.insert({
      title: 'Crash Bandicoot',
      genre: 'family fun',
      price: 2000,
    });
    const res = await request(app).get(`/api/v1/games/${game.id}`);
    expect(res.body).toEqual(game);
  });
});
