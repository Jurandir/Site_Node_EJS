const getCredencialCNPJ       = require('../services/getCredencialCNPJ')

const setCredencialCargas = (req, res, next ) => {
    let { cnpj, pwd } = req.body

    getCredencialCNPJ(cnpj,pwd).then((credencial)=>{
        res.cookie('chave',credencial, { maxAge: 900000, httpOnly: true })
        console.log('getCredencialCNPJ:',credencial)
        next()
    }).catch((err)=>{
        res.cookie('chave','Erro: '+err, { maxAge: 900000, httpOnly: true })
        console.log('ERRO:',err)
        next()
    })  
}
   
module.exports = setCredencialCargas