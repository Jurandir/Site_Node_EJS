const getCredencialCNPJ       = require('../services/getCredencialCNPJ')

const setCredencialCargas = (req, res, next ) => {
    let { cnpj, pwd } = req.body

    getCredencialCNPJ(cnpj,pwd).then((credencial)=>{
        res.cookie('chave',credencial, { maxAge: 900000, httpOnly: true })
        next()
    }).catch((err)=>{
        console.log('ERRO: (setCredencialCargas)',err)
        res.cookie('chave','Erro: '+err, { maxAge: 900000, httpOnly: true })
        next()
    })  
}
   
module.exports = setCredencialCargas