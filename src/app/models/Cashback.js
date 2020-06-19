const fetch = require('node-fetch');

class Cashback{    
    listar(resposta){
        fetch('https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=12312312323', {
            method: 'GET',
            headers: { token: 'ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm' }
        })
        .then(res => res.json())
        .then(json => resposta.json(json.body));
    }    
}

module.exports = new Cashback;