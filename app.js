'use strict';
const express = require('express');
const app = express();
require('dotenv').config();
const Env = process.env;
const postRoute = require('./routes/post')
const authRoute = require('./routes/auth')

app.use(express.json());

const http = require('http').Server(app);
http.listen(Env.PORT, () => {
  console.log('Server run on port: 3003');
});

const routePrefix = '/api/v1'

app.use(`${routePrefix}/auth`, authRoute)
app.use(`${routePrefix}/posts`, postRoute)

// PHẢI KHAI BÁO DƯỚI KHAI BÁO ROUTE
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = {
    error: 404,
    message: 'not_found',
    status: 400,
    data: null,
  }
  next(error)
})

// error handler
app.use((err, req, res, next) => {
  return res.json({
    error: err.error,
    message: err.message,
    status: 400,
    data: null,
  })
})
