class RevendedorController{
    login(req, res){
        res.status(200).json("Login");
    }

    cadastro(req, res){
        res.status(200).json("Cadastro");
    }

    buscaRevendedorPorEmail(email){

    }

    buscaRevendedorPorId(id){

    }

    exibeCashbackAcumulado(req, res){
        res.status(200).json("Exibe Cashback Acumulado");
    }
}

module.exports = RevendedorController;