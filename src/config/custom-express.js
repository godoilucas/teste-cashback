require('dotenv/config');
const express       = require('express');
const consign       = require('consign');
const bodyParser    = require('body-parser');
const morgan        = require("morgan");
const auth          = require('./auth');
const app           = express();

app.use(morgan("combined"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

auth(app);

consign()
    .include('./src/app/models')
    .then('./src/app/controllers')
    .into(app);

app.use((req, res, next)=>{
    return res.status(404).json({mensagem:"Rota não existe"});
});

app.use((erro, req, res, next)=>{
    console.log(erro.name);
    if (erro.name === 'UnauthorizedError') {
        res.status(401).json({mensagem:"Não autorizado"});
    } else{
        return res.status(500).json({mensagem:"Server error"});
    }
    
});

module.exports = app;