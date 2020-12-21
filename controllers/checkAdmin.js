
const checkAdmin = (req, res, next ) => {

   console.log(' **** req.body - checkAdmin : ',req.body)
    
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
    req.session.empresa = req.body.credencial.dados.nome

    let token           = req.body.credencial.dados.token
    res.locals.empresa  = req.body.credencial.dados.nome
    req.session.empresa = req.body.credencial.dados.nome
    res.locals.login    = req.body.credencial.dados.mail

    res.cookie('token',token, { maxAge: 900000, httpOnly: true })
    
    empresa = req.session.empresa
    cnpj    = docs.P1 ||cnpj
    numero  = docs.P2 || ''
    serie   = docs.P3 || ''

    docs = `{"P1":"${cnpj}","P2":"${numero}","P3":"${serie}"}`
    res.cookie('doc', docs)

    res.redirect('/posicaocarga')
}

module.exports = checkAdmin
