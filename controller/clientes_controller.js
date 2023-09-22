module.exports.clientes_controller = (req, res, next)=>{
    console.log('Retornou todos os clientes!');
    res.json([{id: 1, nome: 'Luiz'}]);
};