const { Router } = require('express');

module.exports = Router()
  //
  .post('/', async (req, res) => {
    const game = {
      title: 'star wars battlefront',
      genre: 'shooter',
      price: 1000,
    };
    res.send(game);
  });
