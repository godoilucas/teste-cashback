const ejwt          = require('express-jwt');
const jwt           = require('jsonwebtoken');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const conexao       = require('./conexao');
const AES           = require("crypto-js/aes");
const CryptoJS      = require("crypto-js");

module.exports = (app) => {
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha'
        },
        (email, senha, done) => {
            const sql = `SELECT * FROM Revendedores
                    WHERE email = ?`;
            conexao.query(sql, email, (erro, resultado) => {
                if(erro){
                    return done(erro, false);
                } else{                
                    if(resultado.length==0 || CryptoJS.AES.decrypt(resultado[0].senha, process.env.AES_SECRET).toString(CryptoJS.enc.Utf8) != senha){
                        return done(null, false, {mensagem: "Credenciais invalidas"});
                    } else{
                        return done(null, resultado[0]);
                    }
                }
            });
        }
    ));
    
    app.use(passport.initialize());    

    app.use(ejwt({secret: process.env.JWT_SECRET, userProperty: 'tokenPayload'})
        .unless({path: ['/login','/cadastro']}));
    
    app.use((req, res, next) => {
        req.passport = passport;
        next();
    });
}
