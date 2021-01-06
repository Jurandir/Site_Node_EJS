
const montaTelaTesteAPI =  (req, res) => {
    const url_login = req.session.url_login || '/login'

    const { auth } = req.session
    if (!auth) {
        req.flash('msg_warning', 'Rediresionado - Usuário sem autenticação. !!!!')
        req.session.auth = false
        res.redirect( url_login )    
    } 

    const { doc }  = req.cookies
    let docs = JSON.parse( doc )

    res.render('pages/documento', {
        empresa: req.session.empresa,
        cnpj: docs.P1,
        numero: docs.P2,
        serie: docs.P3
    })
}

module.exports = montaTelaTesteAPI
