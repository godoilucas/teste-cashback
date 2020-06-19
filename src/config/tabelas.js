class Tabelas{
    constructor(conexao){
        this.conexao = conexao;
        this.criarTabelaRevendedores();
        this.criarTabelaCompras();
    }

    criarTabelaRevendedores(){
        const sql = `CREATE TABLE IF NOT EXISTS Revendedores
                        (nome VARCHAR(50) NOT NULL, 
                        cpf VARCHAR(11) NOT NULL UNIQUE,
                        email VARCHAR(255) NOT NULL UNIQUE,
                        senha VARCHAR(255) NOT NULL, 
                        dataCadastro DATETIME NOT NULL,
                        PRIMARY KEY(cpf))`;
        this.conexao.query(sql, erro => {
            if(erro){
                console.log(erro);
            } else{
                console.log("Tabela 'Revendedores' criada com sucesso!");
            }
        });
    }
    
    criarTabelaCompras(){
        const sql = `CREATE TABLE IF NOT EXISTS Compras(
                        id int NOT NULL AUTO_INCREMENT, 
                        valor DECIMAL(7,2) NOT NULL, 
                        cpf VARCHAR(11) NOT NULL, 
                        data DATETIME NOT NULL,
                        percent_cashback FLOAT, 
                        cashback DECIMAL(7,2),
                        status VARCHAR(50),
                        PRIMARY KEY(id),
                        FOREIGN KEY (cpf) REFERENCES Revendedores(cpf))`;
        this.conexao.query(sql, erro => {
            if(erro){
                console.log(erro);
            } else{
                console.log("Tabela 'Compras' criada com sucesso!");
            }
        });
    }
}

module.exports = Tabelas;