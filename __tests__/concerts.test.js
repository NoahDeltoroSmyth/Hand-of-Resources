const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Concert = require('../lib/models/Concert');

describe('Hand-of-Resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a concert', async () => {
    const concert = {
      venue: 'Hawthorne Theatre',
      band: 'Yung Gravy',
      date: '3/5/2020',
    };
    const res = await request(app).post('/api/v1/concerts').send(concert);
    expect(res.body).toEqual({ id: expect.any(String), ...concert });
  });

  it('gets a concert by id', async () => {
    const concert = await Concert.insert({
      venue: 'Alladin',
      band: 'Remo Drive',
      date: '2020-02-10',
    });
    const res = await request(app).get(`/api/v1/concerts/${concert.id}`);
    expect(res.body).toEqual(concert);
  });

  it('gets an array of concerts', async () => {
    await Concert.insert({
      venue: 'Fred Meyer',
      band: 'disco bots',
      date: '2020-02-10',
    });
    await Concert.insert({
      venue: 'Safeway',
      band: 'the wiggles',
      date: '2020-02-10',
    });
    const concerts = await Concert.findAll();
    const res = await request(app).get('/api/v1/concerts');
    expect(res.body).toEqual(concerts);
  });
});
