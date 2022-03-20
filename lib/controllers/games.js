const { Router } = require('express');
const Game = require('../models/Game');

module.exports = Router()
  //
  .post('/', async (req, res) => {
    const game = await Game.insert(req.body);
    res.send(game);
  })

  .get('/:id', async (req, res) => {
    const game = await Game.findById(req.params.id);
    res.send(game);
  })

  .get('/', async (req, res) => {
    const games = await Game.findAll();
    res.send(games);
  })

  .delete('/:id', async (req, res) => {
    const game = await Game.delete(req.params.id);
    res.send(game);
  })

  .patch('/:id', async (req, res) => {
    const game = await Game.update(req.params.id, req.body);
    res.send(game);
  });
