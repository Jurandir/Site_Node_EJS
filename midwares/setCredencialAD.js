const getCredencialCNPJ       = require('../services/getCredencialCNPJ')

const setCredencialAD = (req, res, next ) => {
    let { cnpj, pwd, usuario, senha } = req.body

    let cnpjTest = cnpj || '00000000000000'

    if (usuario) {
        req.body.cnpj = cnpjTest
        req.body.pwd  =  Buffer.from(`"${senha}"`).toString("base64") 
        
        console.log('req.body.pwd:',req.body.pwd)

    }

    getCredencialAD(cnpjTest,pwd).then((credencial)=>{
        res.cookie('chave',credencial, { maxAge: 900000, httpOnly: true })
        next()
    }).catch((err)=>{
        console.log('ERRO: (setCredencialCargas)',err)
        res.cookie('chave','Erro: '+err, { maxAge: 900000, httpOnly: true })
        next()
    })  
}
   
module.exports = setCredencialAD
