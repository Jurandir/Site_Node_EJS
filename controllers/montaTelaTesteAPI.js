
const montaTelaTesteAPI =  (req, res) => {

    const { auth } = req.session
    if (!auth) {
        req.flash('msg_warning', 'Rediresionado - Usuário sem autenticação. !!!!')
        req.session.auth = false
        res.redirect('/login')    
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
