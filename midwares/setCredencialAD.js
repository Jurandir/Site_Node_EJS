const getCredencialAD       = require('../services/getCredencialAD')

const setCredencialAD = (req, res, next ) => {
    let { cnpj, pwd, usuario, senha } = req.body

    let cnpjTest = cnpj || '00000000000000'

    req.body.credencial = {}

    if (usuario) {
        req.body.cnpj = cnpjTest
        req.body.pwd  =  Buffer.from(`"${senha}"`).toString("base64") 
        pwd = req.body.pwd
    }

    getCredencialAD(cnpjTest,usuario,pwd).then((credencial)=>{

        req.body.credencial = credencial

        res.cookie('chave',credencial, { maxAge: 900000, httpOnly: true })
        next()
    }).catch((err)=>{
        console.log('ERRO: (setCredencialAD)',err)
        res.cookie('chave','Erro: '+err, { maxAge: 900000, httpOnly: true })
        next()
    })  
}
   
module.exports = setCredencialAD
