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

  it('creates a concert', async () => {
    const concert = {
      venue: 'Hawthorne Theatre',
      band: 'Yung Gravy',
      date: '2020-03-05',
    };
    const res = await request(app).post('/api/v1/concerts').send(concert);
    expect(res.body).toEqual({ id: expect.any(String), ...concert });
  });
});
