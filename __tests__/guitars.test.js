const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Guitar = require('../lib/models/Guitar');

describe('Hand-of-Resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a guitar', async () => {
    const guitar = {
      manufacturer: 'Gibson',
      color: 'Red',
      stringCount: 6,
    };
    const res = await request(app).post('/api/v1/guitars').send(guitar);
    expect(res.body).toEqual({ id: expect.any(String), ...guitar });
  });

  it('finds a guitar by id', async () => {
    const guitar = await Guitar.insert({
      manufacturer: 'Gibson',
      color: 'Red',
      stringCount: 6,
    });
    const res = await request(app).get(`/api/v1/guitars/${guitar.id}`);
    expect(res.body).toEqual(guitar);
  });
});
