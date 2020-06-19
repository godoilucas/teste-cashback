const Cashback = require('../models/Cashback');

module.exports = app => {
    app.get('/cashback', (req, res) => {
        Cashback.listar(res);
    });
}