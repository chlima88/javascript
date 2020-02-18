// express - lightweight webserver
const express = require('express');
// mongoose - conector para o mongodb
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

//Conexão com o mongodb.atlas - precisa especificar o user (dbuser), senha e database (app01).
// Foram adicionadas configurações adicionais (userNewUrlParser e useUnifiedTopology) para não gerar mensagens de warning

mongoose.connect('mongodb+srv://<user>:<pass>@omnistack-web7l.mongodb.net/app01?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


app.use(express.json());
app.use(routes);


app.listen(3333);
 