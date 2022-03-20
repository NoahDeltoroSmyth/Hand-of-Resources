const { Router } = require('express');

module.exports = Router()
  //
  .post('/', async (req, res) => {
    const restaurant = {
      name: 'Izzys',
      openAt: '08:00:00',
      closeAt: '20:00:00',
    };
    res.send(restaurant);
  });
