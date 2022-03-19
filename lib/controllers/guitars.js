const { Router } = require('express');
const Guitar = require('../models/Guitar');

module.exports = Router()
  //
  .post('/', async (req, res) => {
    const game = await Guitar.insert(req.body);
    res.send(game);
  })

  .get('/:id', async (req, res) => {
    const game = await Guitar.findById(req.params.id);
    res.send(game);
  })

  .get('/', async (req, res) => {
    const guitars = await Guitar.findAll();
    res.send(guitars);
  });
