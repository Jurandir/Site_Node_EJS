const getCliente = require("../auth/getCliente")

const checkAdmin = (req, res, next ) => {

    
    let { cnpj, pwd } = req.body
    let { doc }       = req.cookies

    if (!doc) {
        doc = '{"P1":"","P2":"","P3":""}'
        res.cookie('doc',doc, { maxAge: 900000, httpOnly: true })
    } 
     
    let docs = JSON.parse( doc )
     
    req.session.auth    = true
    req.session.cnpj    = cnpj        
    req.session.user    = req.body.usuario 
    req.session.empresa = req.session.credencial.dados.nome 

    let token           = req.session.credencial.dados.token
    res.locals.empresa  = req.session.credencial.dados.nome
    req.session.empresa = req.session.credencial.dados.nome
    res.locals.login    = req.session.credencial.dados.mail

    res.cookie('token',token, { maxAge: 900000, httpOnly: true })
    
    empresa               = req.session.empresa
    req.session.url_login = '/admin'
    req.session.url_base  = '/home'
    cnpj                  = docs.P1 ||cnpj
    numero                = docs.P2 || ''
    serie                 = docs.P3 || ''

    docs = `{"P1":"${cnpj}","P2":"${numero}","P3":"${serie}"}`
    res.cookie('doc', docs)

    getCliente(cnpj,token).then((cliente)=>{
        

        req.session.cliente = cliente
        req.session.empresa = `${req.session.empresa} => ( ${cliente.dados.NOME} / ${cliente.dados.CNPJ} )`

        res.redirect('/home')

    }).catch((err)=>{
        console.log('Erro:',err,' => (checkAdmin-getCliente)')
        res.redirect( req.session.url_base )
    })

}

module.exports = checkAdmin
