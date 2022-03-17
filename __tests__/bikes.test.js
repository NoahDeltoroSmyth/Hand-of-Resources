const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Bike = require('../lib/models/Bike');

describe('Hand-of-Resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a bike', async () => {
    const expected = {
      manufacturer: 'Federal',
      model: 'Shadow',
      frameSize: 26,
    };
    const res = await request(app).post('/api/v1/bikes').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a bike by id', async () => {
    const bike = await Bike.insert({
      manufacturer: 'Honda',
      model: 'CB360',
      frameSize: 33,
    });
    const res = await request(app).get(`/api/v1/bikes/${bike.id}`);
    expect(res.body).toEqual(bike);
  });

  it('gets an array of bikes', async () => {
    await Bike.insert({
      manufacturer: 'Honda',
      model: 'CB360',
      frameSize: 33,
    });
    await Bike.insert({
      manufacturer: 'Yamaha',
      model: 'XS650',
      frameSize: 39,
    });
    const expected = await Bike.findAll();
    const res = await request(app).get('/api/v1/bikes');
    expect(res.body).toEqual(expected);
  });
});
