const express = require('express');

const app = express();

app.get('/',(req,res) =>{
    return res.json({message :"Hello B2W!"})
})

app.listen(3333);
