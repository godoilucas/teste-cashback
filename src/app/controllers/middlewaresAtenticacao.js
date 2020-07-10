const passport = require('passport');

module.exports = {
    local: (req, res, next) => {
        passport.authenticate(
            'local',
            { session: false },
            (erro, revendedor, info) => {
                if(erro && erro.name === 'InvalidArgumentError'){
                    return res.status(401).json({erro: erro.message});
                }

                if(erro){
                    return res.status(500).json({erro: erro.message});
                }

                if(!revendedor){
                    return res.status(401).json();
                }

                req.user = revendedor;
                return next();
            }
        )(req, res, next);
    },
    bearer: (req, res, next) => {
        passport.authenticate(
            'bearer',
            { session: false},
            (erro, revendedor, info) => {
                if(erro && erro.name === 'JsonWebTokenError'){
                    res.status(401).json({ erro: erro.message });
                }

                if(erro && erro.name === 'TokenExpiredError'){
                    res.status(401).json({ erro: erro.message, expiradoEm: erro.expiredAt });
                }

                if(erro){
                    return res.status(500).json({ erro: erro.message});
                }

                if(!revendedor){
                    return res.status(401).json();
                }
                
                req.token = info.token;
                req.user = revendedor;
                return next();
            }
        )(req, res, next);
    }
};