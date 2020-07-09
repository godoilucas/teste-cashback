const { Router } = require('express');
const ComprasController = require('../controllers/ComprasController');
const router = Router();
const comprasController = new ComprasController();

router
    .get('/revendedor/:revendedorId/compras', comprasController.listaTodasCompras)
    .post('/revendedor/:revendedorId/compras', comprasController.cadastraCompra)
    .get('/revendedor/:revendedorId/compras/:id', comprasController.listaUmaCompra)
    .patch('/revendedor/:revendedorId/compras/:id', comprasController.atualizaCompra)
    .delete('/revendedor/:revendedorId/compras/:id', comprasController.deletaCompra)

module.exports = router;