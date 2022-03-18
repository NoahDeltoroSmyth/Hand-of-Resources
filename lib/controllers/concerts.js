const { Router } = require('express');
const Concert = require('../models/Concert');

module.exports = Router()
  //
  .post('/', async (req, res) => {
    const concert = await Concert.insert(req.body);
    console.log('concert', concert);
    res.send(concert);
  });
