const montaTelaMudaSenha = (req, res) => {

    req.session.url_base='/mudasenha'
    
    res.render('pages/mudasenha', {
        empresa: req.session.empresa,
        cnpj: req.session.cnpj,
    })
}

module.exports = montaTelaMudaSenha