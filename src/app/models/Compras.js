const moment    = require('moment');
const conexao   = require('../../config/conexao');
const { check } = require('express-validator');

class Compras{
    validacoes(){
        return [
            check('valor').isCurrency()
                        .withMessage('O campo deve possuir formato monetário!')
        ];
    }

    cadastrar(req, cpf, res){
        const sql = 'INSERT INTO Compras SET ?';
        const data = moment().format('YYYY-MM-DD HH:mm:ss');

        req.valor = parseFloat(req.valor.replace(",",".")).toFixed(2);

        const cashbackObj = this.calcularCashback(req.valor);
        const percent_cashback = cashbackObj.percent_cashback;
        const cashback = cashbackObj.cashback;
        const status = this.setStatus(cpf).status;
        const dados = {...req, data, cpf, percent_cashback, cashback, status};

        conexao.query(sql, dados, (erro, resultado) =>{
            if(erro){
                res.status(400).json(erro);
            } else{
                res.status(201).json({codigo: resultado.insertId, valor: req.valor, data: data, cashback: cashback});
            }
        });
    }

    listar(cpf, res){
        const sql = `SELECT id AS codigo, 
                            valor, 
                            DATE_FORMAT(data, '%d/%m/%Y %H:%i:%s') AS data,
                            CONCAT(percent_cashback,'%') AS percent_cashback,
                            cashback,
                            status 
                        FROM Compras WHERE cpf=?`;

        conexao.query(sql, cpf, (erro, resultado)=>{
            if(erro){
                res.status(400).json(erro);
            } else{
                if(resultado.length==0){
                    res.status(200).json({mensagem: "Não há dados de compras para o revendedor"});
                } else{
                    res.status(200).json(resultado);
                }
                
            }
        });
    }

    calcularCashback(valor){
        if(valor<1000){
            const percent_cashback=10;
            return {
                percent_cashback: percent_cashback,
                cashback: (valor*(percent_cashback/100)).toFixed(2)
            };
        } else if(valor >= 1000 && valor <= 1500){
            const percent_cashback=15;
            return {
                percent_cashback: percent_cashback,
                cashback: (valor*(percent_cashback/100)).toFixed(2)
            };
        } else if(valor > 1500){
            const percent_cashback=20;
            return {
                percent_cashback: percent_cashback,
                cashback: (valor*(percent_cashback/100)).toFixed(2)
            };
        } else{
            const percent_cashback=0;
            return {
                percent_cashback: percent_cashback,
                cashback: (valor*(percent_cashback/100)).toFixed(2)
            };
        }
    }

    setStatus(cpf){
        if(cpf=="15350946056"){
            return {status: "Aprovado"};
        } else{
            return {status: "Em Validação"};
        }
    }

    buscarPorId(id, cpf, res){
        const sql= `SELECT id AS codigo, 
                            valor, 
                            DATE_FORMAT(data, '%d/%m/%Y %H:%i:%s') AS data,
                            CONCAT(percent_cashback,'%') AS percent_cashback,
                            cashback,
                            status 
                        FROM Compras
                        WHERE id=? AND cpf=?`;

        conexao.query(sql, [id, cpf], (erro, resultado) => {
            if(erro){
                res.status(400).json(erro);
            } else{
                if(resultado.length==0){
                    res.status(200).json({mensagem: "Não há compras com o código informado"});
                } else{
                    res.status(200).json(resultado[0]);
                }                
            }
        });
    }

    atualizar(id, status, cpf, res){
        const sql= `UPDATE Compras SET status=? WHERE status = 'Em Validação' AND id=? AND cpf=?`;

        conexao.query(sql, [status.status, id, cpf], (erro, resultado) => {
            if(erro){
                res.status(400).json(erro);
            } else{
                res.status(200).json({mensagem:resultado.message});
            }
        });
    }

    remover(id, cpf, res){
        const sql= `DELETE FROM Compras WHERE status = 'Em Validação' AND id=? AND cpf=?`;

        conexao.query(sql, [id, cpf], (erro, resultado) => {
            if(erro){
                res.status(400).json(erro);
            } else{
                if(resultado.affectedRows==0){
                    res.status(200).json({codigo: id, mensagem: "Não é possível remover essa compra"});
                } else{
                    res.status(200).json({codigo: id, mensagem: "Removido com sucesso"});
                }                
            }
        });
    }
}

module.exports = new Compras;