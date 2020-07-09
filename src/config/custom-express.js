require('dotenv/config');
const express       = require('express');
const bodyParser    = require('body-parser');
const morgan        = require("morgan");
const routes        = require('../app/routes');
const auth          = require('./auth');
const app           = express();

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//auth(app);
routes(app);

app.use((req, res, next)=>{
    return res.status(404).json({ erro:"Rota inexistente" });
});

app.use((erro, req, res, next)=>{
    console.log(erro.name);
    if (erro.name === 'UnauthorizedError') {
        res.status(401).json({ erro:"Não autorizado" });
    } else{
        return res.status(500).json({ erro:"Server error" });
    }
    
});

module.exports = app;