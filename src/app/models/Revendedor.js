const moment    = require('moment');
const conexao   = require('../../config/conexao');
const { check } = require('express-validator');
const jwt       = require('jsonwebtoken');
const AES       = require("crypto-js/aes");
const CryptoJS  = require("crypto-js");


class Revendedor{
    validacoesCadastro(){
        return [
            check('nome').isString()
                        .withMessage('O nome deve ser uma string!'),
            check('cpf').isNumeric()
                        .isLength({ min: 11, max: 11 })
                        .withMessage('O campo cpf deve conter 11 dígitos e ser numérico!'),
            check('email').isEmail()
                        .withMessage('O campo e-mail deve possuir um valor de e-mail válido')
        ];
    }

    cadastrar(revendedor, res){
        revendedor.senha = CryptoJS.AES.encrypt(revendedor.senha, process.env.AES_SECRET).toString();
        
        const dataCadastro = moment().format('YYYY-MM-DD HH:mm:ss');
        const sql = `INSERT INTO Revendedores SET ?`;
        
        const revendedorDatado = {...revendedor, dataCadastro};

        
        conexao.query(sql, revendedorDatado, (erro, resultado) => {
            if(erro){
                res.status(400).json(erro);
            } else{
                res.status(201).json({mensagem:"Cadastrado com sucesso", 
                                        nome: revendedor.nome, 
                                        cpf: revendedor.cpf,
                                        email: revendedor.email
                                    });
            }
        });
    }

    login(){
        return function(req, res, next){
            const passport = req.passport;
            passport.authenticate('local', (erro, usuario, info) => {                
                if(erro){
                    return next(erro);
                }
                if(!usuario){
                    return res.status(401).json({mensagem: "Credenciais inválidas"});
                } else{
                    return res.status(200).json({token: jwt.sign({cpf:usuario.cpf},process.env.JWT_SECRET)});
                }
            })(req, res, next);
        }
    }
}

module.exports = new Revendedor;