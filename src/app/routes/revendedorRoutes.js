const { Router } = require('express');
const RevendedorController = require('../controllers/RevendedorController');
const router = Router();
const revendedorController = new RevendedorController();
const middlewaresAutenticacao = require('../controllers/middlewaresAtenticacao');

router
    .post('/revendedor/login', middlewaresAutenticacao.local, revendedorController.login)
    .post('/revendedor/cadastro', revendedorController.cadastro)
    .get('/revendedor/cashback', revendedorController.exibeCashbackAcumulado);

module.exports = router;