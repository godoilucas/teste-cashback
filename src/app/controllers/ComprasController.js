const db = require('../models');
const RevendedorController = require('./RevendedorController');

function calculaCashback(valor){
    if(valor < 1000){
        const porcentagem = 10;
        return {
            porcentagem: porcentagem,
            valor: parseFloat(Number(valor)*porcentagem/100).toFixed(2)
        };
    } else if (valor >= 1000 && valor <=1500){
        const porcentagem = 15;
        return {
            porcentagem: porcentagem,
            valor: parseFloat(Number(valor)*porcentagem/100).toFixed(2)
        };
    } else{
        const porcentagem = 20;
        return {
            porcentagem: porcentagem,
            valor: parseFloat(Number(valor)*porcentagem/100).toFixed(2)
        };
    }
}

class ComprasController{
    async listaTodasCompras(req, res){
        try {
            const { revendedorId } = req.params;
            const todasCompras = await db.Compras.findAll({ 
                where: { revendedores_id: Number(revendedorId) },
                attributes: [['id','codigo'], 'valor', [db.Sequelize.fn('date_format', db.Sequelize.col('Compras.createdAt'), '%d/%m/%Y'),'data'] ,['percent_cashback', '% cashback'], 'cashback', 'status' ],
                include: { model: db.Revendedores, attributes: ['nome', 'cpf']}
            });

            return res.status(200).json(todasCompras);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async listaUmaCompra(req, res){
        try {
            const { revendedorId, id } = req.params;
            const compra = await db.Compras.findOne({
                where: { revendedores_id: Number(revendedorId), id: Number(id) },
                attributes: [['id','codigo'], 'valor', [db.Sequelize.fn('date_format', db.Sequelize.col('Compras.createdAt'), '%d/%m/%Y'),'data'] ,['percent_cashback', '% cashback'], 'cashback', 'status' ],
                include: { model: db.Revendedores, attributes: ['nome', 'cpf']}
            });

            return res.status(200).json(compra);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async cadastraCompra(req, res){
        try {
            const { revendedorId } = req.params;
            const revendedor = await RevendedorController.buscaRevendedorPorId(revendedorId);
            const status = revendedor.cpf == '15350946056' ? 'Aprovado' : 'Em validação';
            const cashback = calculaCashback(req.body.valor);

            const novaCompra = {...req.body, 
                                percent_cashback: cashback.porcentagem, 
                                cashback: cashback.valor,
                                status: status,
                                revendedores_id: revendedorId,
                                createdAt: new Date(),
                                updatedAt: new Date()
                            };

            const novaCompraCriada = await db.Compras.create(novaCompra);

            return res.status(200).json(novaCompraCriada);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
        
    }

    async atualizaCompra(req, res){
        try {
            const { revendedorId, id } = req.params;
            const compra = await ComprasController.buscaCompraPorId(id);

            if(compra.status === 'Em validação'){
                const novosDados = {
                    status: req.body.status,
                    updatedAt: new Date()
                };
                await db.Compras.update(novosDados, { where: { revendedores_id: Number(revendedorId), id: Number(id) }});
                const compraAtualizada = await ComprasController.buscaCompraPorId(id);
                
                return res.status(200).json(compraAtualizada);
            } else{
                return res.status(200).json({mensagem: `Compras com status ${compra.status} não podem ser atualizadas.`});
            }            
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async deletaCompra(req, res){
        try {
            const { revendedorId, id } = req.params;
            const compra = await ComprasController.buscaCompraPorId(id);

            if(compra.status === 'Em validação'){
                await db.Compras.destroy({ where: { revendedores_id: Number(revendedorId), id: Number(id) }});

                return res.status(200).json({mensagem: `Compra com código ${id} foi excluída com sucesso`});
            } else{
                return res.status(200).json({mensagem: `Compras com status ${compra.status} não podem ser excluídas.`});
            }            
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    static async buscaCompraPorId(id){
        const compra = await db.Compras.findOne({
            where: { id: Number(id) },
            attributes: [['id','codigo'], 'valor', [db.Sequelize.fn('date_format', db.Sequelize.col('Compras.createdAt'), '%d/%m/%Y'),'data'] ,['percent_cashback', '% cashback'], 'cashback', 'status' ],
            include: { model: db.Revendedores, attributes: ['nome', 'cpf']}
        });

        return compra;
    }
}

module.exports = ComprasController;