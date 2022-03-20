const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/bikes', require('./controllers/bikes'));
app.use('/api/v1/concerts', require('./controllers/concerts'));
app.use('/api/v1/games', require('./controllers/games'));
app.use('/api/v1/guitars', require('./controllers/guitars'));
app.use('/api/v1/restaurants', require('./controllers/restaurants'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
