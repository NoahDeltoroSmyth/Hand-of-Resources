const { Router } = require('express');
const Concert = require('../models/Concert');

module.exports = Router()
  //
  .post('/', async (req, res) => {
    const concert = await Concert.insert(req.body);
    res.send(concert);
  })

  .get('/:id', async (req, res) => {
    const concert = await Concert.getById(req.params.id);
    res.send(concert);
  })

  .get('/', async (req, res) => {
    const concerts = await Concert.findAll();
    res.send(concerts);
  })

  .delete('/:id', async (req, res) => {
    const concert = {
      id: '1',
      venue: 'Goodwill',
      band: 'Limp Bizkit',
      date: '3/20/2022',
    };
    res.send(concert);
  });
