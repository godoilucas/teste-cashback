const fetch = require('node-fetch');

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
        try {
            fetch('https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=12312312323', {
                method: 'GET',
                headers: { token: 'ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm' }
            })
            .then(r => r.json())
            .then(json => res.status(200).json(json.body));
        } catch (error) {
            res.status(200).json({ erro: error.message });
        }
            
    }
}

module.exports = RevendedorController;