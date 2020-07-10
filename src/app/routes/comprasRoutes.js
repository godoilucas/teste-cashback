const { Router } = require('express');
const ComprasController = require('../controllers/ComprasController');
const router = Router();
const comprasController = new ComprasController();
const middlewaresAutenticacao = require('../controllers/middlewaresAtenticacao');

router
    .get('/revendedor/:revendedorId/compras', middlewaresAutenticacao.bearer, comprasController.listaTodasCompras)
    .post('/revendedor/:revendedorId/compras', middlewaresAutenticacao.bearer, comprasController.cadastraCompra)
    .get('/revendedor/:revendedorId/compras/:id', middlewaresAutenticacao.bearer, comprasController.listaUmaCompra)
    .patch('/revendedor/:revendedorId/compras/:id', middlewaresAutenticacao.bearer, comprasController.atualizaCompra)
    .delete('/revendedor/:revendedorId/compras/:id', middlewaresAutenticacao.bearer, comprasController.deletaCompra)

module.exports = router;