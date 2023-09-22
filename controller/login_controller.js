const jwt = require('jsonwebtoken');

module.exports.login_controller = (req, res, next) => {
    if(req.body.user === 'Luiz' && req.body.pwd === '123'){
        //Usuário autenticado.
        const userId = 1;
        const token = jwt.sign({userId}, process.env.SECRET, {
            expiresIn: 300
        });
        return res.json({auth: true, token: token});
    };
    res.status(401).json({message: 'Login inválido!'});
};

module.exports.logout_controller = (req, res)=>{
    blacklist.push(req.header['x-access-token']);
    res.json({auth: false, token: null});
};