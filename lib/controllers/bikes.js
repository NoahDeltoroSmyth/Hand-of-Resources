const { Router } = require('express');
const Bike = require('../models/Bike');

module.exports = Router()
  //
  .post('/', async (req, res) => {
    const bike = await Bike.insert(req.body);
    res.send(bike);
  })

  .get('/:id', async (req, res) => {
    // const bike = {
    //   id: '1',
    //   manufacturer: 'Honda',
    //   model: 'CB360',
    //   frameSize: 33,
    // };
    const bike = await Bike.findById(req.params.id);
    res.send(bike);
  })

  .get('/', async (req, res) => {
    const bikes = await Bike.findAll();
    res.send(bikes);
    console.log('bikes', bikes);
  });
