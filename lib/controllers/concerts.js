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
  });
