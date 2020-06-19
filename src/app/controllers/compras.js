const { validationResult }  = require('express-validator');
const Compras            = require('../models/Compras');

module.exports = app => {
    app.route('/compras')
        .get((req, res) => {
            Compras.listar(req.tokenPayload.cpf, res);
        })
        .post((req, res) => {
            Compras.cadastrar(req.body, req.tokenPayload.cpf, res);
        });

    app.route('/compras/:id')
        .get((req, res) => {
            const id = parseInt(req.params.id);
            Compras.buscarPorId(id, req.tokenPayload.cpf, res);
        })
        .patch((req, res) => {            
            const id = parseInt(req.params.id);
            Compras.atualizar(id, req.body, req.tokenPayload.cpf, res);
        })
        .delete((req, res) =>{
            const id = parseInt(req.params.id);
            Compras.remover(id, req.tokenPayload.cpf, res);
        });
} 