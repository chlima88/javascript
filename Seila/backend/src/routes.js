const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController')

const routes = express.Router();
const upload = multer(uploadConfig);

// req.query = acessa query patterns (para filtros)
// req.params = acessa rout params (para edição, delete)
// req.body = acessa o corpo da requisição (para criação e edição)


routes.get('/', (req,res) =>{
    return res.json({message :"It Works!"});
})

routes.post('/sessions', SessionController.store);

routes.post('/spots', upload.single('thumbnail'), SpotController.store);

module.exports = routes;
