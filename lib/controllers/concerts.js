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
    const concert = await Concert.delete(req.params.id);
    res.send(concert);
  })

  .patch('/:id', async (req, res) => {
    const concert = await Concert.update(req.params.id, req.body);
    res.send(concert);
  });
