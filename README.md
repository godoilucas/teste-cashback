# **Teste Cashback**
## **Inicialização do arquivo**
Para uma correta execução é necessário possuir uma instancia de banco de dados MySQL.

Após realizar o dowload do projeto será necessário realizar a configuração do arquivo .env (variáveis ambiente). No projeto há um arquivo com o exemplo (.env.exemplo).

Ao iniciar o servidor, a conexão com o banco de dados será efetuada e as tabelas serão criadas automaticamente (/src/config/tabelas.js)

Após realizadas todas as configurações, executar os seguintes comandos:
```
npm install
npm start
```
O projeto possui as rotas abaixo configuradas:

#### POST( '/cadastro' )
//Reponsável pelo cadastro do Revendedor. (Não necessita autenticação)
Formato do body enviado
```
{
    nome: 'Nome dx revendedor(a)',
    cpf: '00000000000', //CPF sem pontos e traços
    email: 'revendedor@hotmail.com',
    senha: 'pass'
}
```

#### POST( '/login' )
//Reponsável por validar login. (Não necessita autenticação | Retorna token de autenticação)
Formato do body enviado
```
{
    email: 'revendedor@hotmail.com',
    senha: 'pass'
}
```
#### GET( '/compras' )
//Reponsável por listar as compras

#### POST( '/compras' )
//Responsável por cadastrar uma nova compra. (Todos outros campos não estão vindo do formulário)
Formato do body enviado
```
{
    valor: 1000.00
}
```

#### GET( '/compras/:id' )
//Reponsável por listar uma compra em específico

#### PATCH( '/compras/:id' )
//Reponsável por atualizar uma compra. Fixada para atualizar apenas status e quando o mesmo encontra-se no status de "Em Validação"
Formato do body enviado
```
{
    status: Aprovado
}
```

#### DELETE( '/compras/:id' )
//Reponsável por remover uma compra, somente se esta estiver em status "Em Validação"

#### GET( '/cashback' )
//Reponsável por retornar o acumulado do cashback