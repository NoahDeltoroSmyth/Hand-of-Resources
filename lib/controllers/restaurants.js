const { Router } = require('express');
const Restaurant = require('../models/Restaurant');

module.exports = Router()
  //
  .post('/', async (req, res) => {
    const restaurant = await Restaurant.insert(req.body);
    res.send(restaurant);
  })

  .get('/:id', async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    res.send(restaurant);
  })

  .get('/', async (req, res) => {
    const restaurants = await Restaurant.findAll();
    res.send(restaurants);
  })

  .patch('/:id', async (req, res) => {
    const restaurant = await Restaurant.update(req.params.id, req.body);
    console.log('restaurant', restaurant);
    res.send(restaurant);
  })

  .delete('/:id', async (req, res) => {
    const restaurant = await Restaurant.delete(req.params.id);
    res.send(restaurant);
  });
