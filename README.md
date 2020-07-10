# **Teste Cashback**
## **Atualizado**
### Atualizado em 10/07/2020:
- Alteração nas rotas;
- Utilização de ORM (Sequelize);
- Mudança na autenticação;

### Próximos passos:
- Inclusão de logout utilizando blacklist com redis;
- Testes automatizados (jest);
- Validações de campos;
- Autorização (foi implementado apenas autenticação jwt, mas não autoriração)

### **Executar projeto**
Ao realizar o download do projeto, executar o comando 'npm install'

#### Configuração Sequelize
É necessário possuir uma instancia do banco de dados rodando. Eu utilizei MySQL. Caso queira alterar, deverá realizar o npm install da base desejada (que seja aceita pelo sequelize).

Também será necessário configurar o arquivo .env (com as variáveis de ambiente). No projeto há um arquivo com o exemplo (.env.exemplo).

Executar os seguintes comandos do sequelize para criação das tabelas e execução dos seeders.

```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Após realizadas todas as configurações, o servidor já pode ser iniciado com o comando 'npm start'

### Rotas

#### POST( '/revendedor/cadastro' )
- Reponsável pelo cadastro do Revendedor. Não necessita autenticação

- Parâmetros de entrada
```
{
    nome: 'Nome dx revendedor(a)',
    cpf: '00000000000', //CPF sem pontos e traços
    email: 'revendedor@hotmail.com',
    senha: 'pass'
}
```

#### POST( '/revendedor/login' )
- Responsável por validar o login do usuário. Não necessita autenticação. Retorna o token no header 'Authorization'

- Parâmetros de entrada
```
{
    email: 'revendedor@hotmail.com',
    senha: 'pass'
}


```
#### GET( '/revendedor/:revendedorId/compras' )
- Responsável por listar todas as compras de um revendedor


#### GET( '/revendedor/:revendedorId/compras/:id' )
- Responsável por listar uma compra específica de um revendedor


#### POST( '/revendedor/:revendedorId/compras' )
- Responsável por cadastrar uma nova compra para um revendedor específico.

- Parâmetros de entrada
```
{
    valor: 1000.00
}
```


#### PATCH( '/revendedor/:revendedorId/compras/:id' )
- Reponsável por atualizar uma compra de um revendedor específico. Fixada para atualizar apenas status e quando o mesmo encontra-se no status de "Em Validação"

- Parâmetros de entrada
```
{
    status: Aprovado
}
```

#### DELETE( '/revendedor/:revendedorId/compras/:id' )
- Reponsável por remover uma compra de um revendedor específico. Fixada para remover apenas quando o status é igual a "Em Validação"


#### GET( '/revendedor/:revendedorId/cashback' )
//Reponsável por retornar o acumulado do cashback