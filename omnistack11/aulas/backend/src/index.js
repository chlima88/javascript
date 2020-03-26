const express = require('express');

/* Sempre utilizar './' no 'require' ao importar modulos proprios (não instalados) */
const routes = require('./routes');

const app = express();

/* Faz a aplicação entender JSON */
app.use(express.json());
app.use(routes);

app.listen(3333);

