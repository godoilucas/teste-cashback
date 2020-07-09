class ComprasController{
    listaTodasCompras(req, res){
        res.status(200).json('Lista Todas Compras');
    }

    listaUmaCompra(req, res){
        res.status(200).json('Lista Uma Compras');
    }

    cadastraCompra(req, res){
        res.status(200).json('Cadastra Compra');
    }

    atualizaCompra(req, res){
        res.status(200).json('Atualiza Compra');
    }

    deletaCompra(req, res){
        res.status(200).json('Deleta Compra');
    }
}

module.exports = ComprasController;