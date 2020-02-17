const express = require('express');

const routes = express.Router();

routes.get('/', (req,res) =>{
    return res.json({message :"payload data"});
})

routes.post('/users', (req,res) =>{
    return res.json(req.body);
})

module.exports = routes;