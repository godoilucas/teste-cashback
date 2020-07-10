const fetch = require('node-fetch');
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function calculaSenhaHash(senha){
    const custoHash = 12;
    return bcrypt.hash(senha, custoHash);
}

function validaCpf(cpf){
    let v1 = 0;
    let v2 = 0;
    let aux = false;
    
    //verificar se todos digitos são iguais
    for (let i = 1; cpf.length > i; i++) {
        if (cpf[i - 1] != cpf[i]) {
            aux = true;   
        }
    } 
    
    if (aux == false) {
        return false; 
    } 
    
    for (let i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
        v1 += cpf[i] * p; 
    } 
    
    v1 = ((v1 * 10) % 11);
    
    if (v1 == 10) {
        v1 = 0; 
    }
    
    if (v1 != cpf[9]) {
        return false; 
    } 
    
    for (var i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
        v2 += cpf[i] * p; 
    } 
    
    v2 = ((v2 * 10) % 11);
    
    if (v2 == 10) {
        v2 = 0; 
    }
    
    if (v2 != cpf[10]) {
        return false; 
    } else {   
        return true; 
    }
}

function criaTokenJWT(revendedor){
    const payload = {
      id: revendedor.id
    };
  
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
    return token;
}

class RevendedorController{
    login(req, res){
        const token = criaTokenJWT(req.user);
        res.set('Authorization', token);
        res.status(204).send();
    }

    async cadastro(req, res){
        //falta criar a validação dos campos (se está preenchido e com os valores esperados)
        try {
            let revendedor = req.body;
            const cpfEhValido = validaCpf(revendedor.cpf);
            if(!cpfEhValido){
                return res.status(200).json({ mensagem: `O cpf ${revendedor.cpf} não é um cpf válido` });    
            }

            const emailJaCadastrado = await RevendedorController.buscaRevendedorPorEmail(revendedor.email);
            if(emailJaCadastrado) return res.status(200).json({ mensagem: `O email informado ${revendedor.email} já possui cadastro em nossa base` });

            revendedor.senha = await calculaSenhaHash(revendedor.senha);
            
            const novoRevendedor = {
                ...revendedor,
                createdAt: new Date(),
                updatedAt: new Date 
            }

            const novoRevendedorCriado = await db.Revendedores.create(novoRevendedor);

            return res.status(200).json(novoRevendedorCriado);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
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

    static async buscaRevendedorPorEmail(email){
        const revendedor = await db.Revendedores.findOne({ where: { email: email }});
        return revendedor;   
    }

    static async buscaRevendedorPorId(id){
        const revendedor = await db.Revendedores.findOne({ where: { id: id }});
        return revendedor;        
    }
}

module.exports = RevendedorController;