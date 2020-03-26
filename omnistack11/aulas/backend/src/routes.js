const express = require('express');
const crypto = require('crypto');
const routes = express.Router();

routes.post('/ongs', (request, response) =>{
  const { name, email, whatsapp, city, uf } = request.body;

  const id = crypto.randomBytes(4).toString('HEX');

  console.log(data)

  return response.json();
})

routes.get('/users',(request, response) => {
  return response.json({
    evento: 'Omnistack11',
    alune: 'Charles'
  });
} );

/* 
Query Params: Parametros nomeados enviados na rota após o '?' que
geralmente servem para filtros
Ex. PATCH http://localhost:3333/users?name=Charles 
*/

routes.patch('/users', (request, response) => {
  const params = request.query;
  console.log(params);

  return response.json({
    evento: 'Omnistack11',
    alune: 'Charles'
  });
  
})

/* 
Route Params: Parâmetros utilizados para idenfificar recursos.
Ex: GET locahost:3333/users/1
*/
routes.get('/users/:id', (requests, response) => {
  const id = request.params;
  console.log(params)
})

/*
Request Body: Corpo da requisição, utilizado para criar ou alterar
recursos
Ex. POST localhost:3333/users
*/
routes.post('/users', (request, response) => {
  const body = request.body;
  console.log(body);

  return response.json({
    evento: 'Omnistack11',
    alune: 'Blenda'
  });
  
})

/* Requerido para tornar o routes.js disponivel para importação
no index.js */
module.exports = routes;