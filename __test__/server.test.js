'use strict';

const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.app);

describe('My API server',()=>{
    
  beforeEach(()=>{
    jest.spyOn(console,'log').mockImplementation();
  });

  it('Not found Request',async()=>{
    const response = await request.get('/abs');
    expect(response.status).toEqual(404);
  });

  it ('bad method',async()=>{
    const response = await request.post('/abc');
    expect(response.status).toEqual(404);
  });
  
  it('Internal Server Error',async()=>{
    const response = await request.get('/person');
    expect(response.status).toEqual(500);
  });

  it('Getting Data',async()=>{
    const response = await request.get('/person').query({name:'razan'});
    expect(response.status).toEqual(200);
  });

  it('Working Route',async()=>{
    const response = await request.get('/person').query({name:'razan'});
    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual('object');
  });
});