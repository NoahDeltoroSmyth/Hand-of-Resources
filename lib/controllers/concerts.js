const { Router } = require('express');

module.exports = Router()
  //
  .post('/', async (req, res) => {
    const concert = {
      id: '1',
      venue: 'Hawthorne Theatre',
      band: 'Yung Gravy',
      date: '2020-03-05',
    };
    res.send(concert);
  });
