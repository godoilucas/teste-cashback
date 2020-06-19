const { validationResult }  = require('express-validator');
const Revendedor            = require('../models/Revendedor');

module.exports = app => {
    app.post('/cadastro', Revendedor.validacoesCadastro(), (req, res) => {
            const erros = validationResult(req);
            if(!erros.isEmpty()){
                res.status(400).json(erros);
            } else{
                Revendedor.cadastrar(req.body, res);
            }
            
        });

    app.post('/login', Revendedor.login());
}