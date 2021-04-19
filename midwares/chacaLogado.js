const chacaLogado = (req, res, next) => {
    const { auth } = req.session
    if (!auth) {
        req.flash('msg_warning', 'Redirecionado - Usuário sem autenticação. !!!!')
        req.session.auth = false
        res.redirect('/login')    
    } else {
        next()
    }
}   

module.exports = chacaLogado