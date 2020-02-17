const express = require('express');
const routes = require('./routes');

const app = express();

// req.query = acessa query patterns (para filtros)
// req.params = acessa rout params (para edição, delete)
// req.body = acessa o corpo da requisição (para criação e edição)

app.use(express.json());
app.use(routes);


app.listen(3333);
