const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Restaurant = require('../lib/models/Restaurant');

describe('Hand-of-Resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new restaurant', async () => {
    const restaurant = {
      name: 'Izzys',
      openAt: '08:00:00',
      closeAt: '20:00:00',
    };
    const res = await request(app).post('/api/v1/restaurants').send(restaurant);
    expect(res.body).toEqual({ id: expect.any(String), ...restaurant });
  });

  it('responds with a restaurant by id', async () => {
    const restaurant = await Restaurant.insert({
      name: 'Dennys',
      openAt: '06:00:00',
      closeAt: '23:00:00',
    });
    const res = await request(app).get(`/api/v1/restaurants/${restaurant.id}`);
    expect(res.body).toEqual(restaurant);
    console.log('res.body', res.body);
  });
});
