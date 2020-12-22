const logout = (req, res) => {
    req.session.auth    = false
    req.session.cnpj    = ''
    req.session.user    = ''
    req.session.empresa = ''
    res.clearCookie('user_sid')
    res.clearCookie('doc')
    req.flash('msg_info', 'Logout realizado com sucesso !!!!')
    res.redirect( req.session.url_login ) 
}

module.exports = logout