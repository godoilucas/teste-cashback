const app = require("./src/config/custom-express");
const conexao = require('./src/config/conexao');
const Tabelas  = require('./src/config/tabelas');

conexao.connect(erro => {
    if(erro){
        console.log(erro);
    } else{
        console.log("MySQL conectado com sucesso!");
        
        const tabelas = new Tabelas(conexao);
        
        const port = process.env.PORT | 3000;
        app.listen(port,() => console.log(`Servidor rodando na porta ${port}`));
    }
});