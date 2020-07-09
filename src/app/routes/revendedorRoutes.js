const { Router } = require('express');
const RevendedorController = require('../controllers/RevendedorController');
const router = Router();
const revendedorController = new RevendedorController();

router
    .post('/revendedor/login', revendedorController.login)
    .post('/revendedor/cadastro', revendedorController.cadastro)
    .get('/revendedor/cashback', revendedorController.exibeCashbackAcumulado);

module.exports = router;