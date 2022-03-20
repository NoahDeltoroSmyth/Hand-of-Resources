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
    console.log('restaurant', restaurant);
    res.send(restaurant);
  })

  .get('/', async (req, res) => {
    const restaurants = await Restaurant.findAll();
    res.send(restaurants);
    console.log('restaurants', restaurants);
  });
