require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const login_controller = require('../controller/login_controller');
const clientes_controller = require('../controller/clientes_controller');

const router = express.Router();

const blacklist = [];

router.get('/clientes', verifyJWT, clientes_controller.clientes_controller);
router.post('/login', login_controller.login_controller);
router.post('/logout', login_controller.logout_controller);

//Função JWT:
function verifyJWT(req, res, next){
    var token = req.headers['authorization'];
    if(!token) return res.status(401).json({auth: false, message: 'No token provided.'});

    const index = blacklist.findIndex(item => item === token);
    if(index !== -1) return res.status(401).end();

    jwt.verify(token, process.env.SECRET, function(err, decoded){
        if(err) return res.status(401).json({auth: false, message: 'Failed to authenticate token.'});
        
        req.userId = decoded.id;
        next();
    });
};

module.exports = router;