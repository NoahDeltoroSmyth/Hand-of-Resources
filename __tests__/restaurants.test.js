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
  });

  it('responds with an array of restaurants', async () => {
    await Restaurant.insert({
      name: 'Ihop',
      openAt: '04:00:00',
      closeAt: '23:00:00',
    });
    await Restaurant.insert({
      name: 'Muchas Gracias',
      openAt: '02:00:00',
      closeAt: '22:00:00',
    });
    const restaurants = await Restaurant.findAll();
    const res = await request(app).get('/api/v1/restaurants');
    expect(res.body).toEqual(restaurants);
  });

  it('updates a restaurant', async () => {
    const restaurant = await Restaurant.insert({
      name: 'Super Taco Express',
      openAt: '10:00:00',
      closeAt: '22:00:00',
    });
    const res = await request(app)
      .patch(`/api/v1/restaurants/${restaurant.id}`)
      .send({ name: 'King Burrito' });
    expect(res.body).toEqual({ ...restaurant, name: 'King Burrito' });
    console.log('res.body', res.body);
  });

  it('deletes a restaurant', async () => {
    const restaurant = await Restaurant.insert({
      name: 'Deli',
      openAt: '09:00:00',
      closeAt: '22:00:00',
    });
    const res = await request(app).delete(
      `/api/v1/restaurants/${restaurant.id}`
    );
    expect(res.body).toEqual(restaurant);
  });
});
