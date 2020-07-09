const revendedor = require('./revendedorRoutes');
const compras    = require('./comprasRoutes');

module.exports = app => {
    app.use(
        revendedor,
        compras
    );
}