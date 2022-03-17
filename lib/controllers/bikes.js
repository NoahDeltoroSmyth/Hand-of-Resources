const { Router } = require('express');
// import model

module.exports = Router()
  //
  .post('/', async (req, res) => {
    const bike = {
      id: '1',
      manufacturer: 'Federal',
      model: 'Shadow',
      frameSize: 26,
    };
    res.send(bike);
  });
