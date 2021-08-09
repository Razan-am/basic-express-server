'use strict';

const express = require('express');

const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');
const validator = require('./middleware/validator');

const app = express();

app.use(logger);

function start(port){
  app.listen(port,()=>{
    console.log(`Running on port ${port}`);
  });
}

app.get ('/',(req,res)=>{
  res.send('Server is working fine');
});

app.get ('/status',(req,res)=>{
  res.send({
    domain:'https://basic-express-ser.herokuapp.com/',
    status:'running',
    port:'3000',
  });
});

app.get('/person',validator,(req,res)=>{
  const name = req.query.name;
  res.json({
    name:name ,
  });
});

app.use('*',notFoundHandler);
app.use(errorHandler);

module.exports={
  app:app,
  start:start,
};