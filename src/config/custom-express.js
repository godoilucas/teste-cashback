require('dotenv/config');
const express       = require('express');
const bodyParser    = require('body-parser');
const morgan        = require("morgan");
const routes        = require('../app/routes');
const app           = express();

const estrategiasAutenticacao = require('../app/controllers/estrategiasAutenticacao');

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

app.use((req, res, next)=>{
    return res.status(404).json({ erro:"Rota inexistente" });
});

module.exports = app;