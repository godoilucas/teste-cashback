const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const RevendedorController = require('./RevendedorController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { InvalidArgumentError } = require('../../config/erros');

async function comparaSenhaHash(senha, senhaHash){
    const senhaEhValida = await bcrypt.compare(senha, senhaHash);
    if(!senhaEhValida) {
        throw new InvalidArgumentError('E-mail ou senha inválidos');
    }
}

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha',
            session: false
        }, async (email, senha, done) => {
            try {
                const revendedor = await RevendedorController.buscaRevendedorPorEmail(email);
                if(!revendedor) throw new Error(`Revendedor com o e-mail ${email} não cadastrado`);
                
                await comparaSenhaHash(senha, revendedor.senha);
                done(null, revendedor);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    new BearerStrategy(
        async (token, done) =>{
            try {
                const payload = jwt.verify(token, process.env.JWT_SECRET);
                const revendedor = await RevendedorController.buscaRevendedorPorId(payload.id)
                done(null, revendedor, { token: token });
            } catch (error) {
                done(error);
            }
        }
    )
);