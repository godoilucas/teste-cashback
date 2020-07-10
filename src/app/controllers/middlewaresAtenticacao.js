const passport = require('passport');

module.exports = {
    local: (req, res, next) => {
        passport.authenticate(
            'local',
            { session: false },
            (erro, revendedor, info) => {
                console.log(erro);
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
    }
};