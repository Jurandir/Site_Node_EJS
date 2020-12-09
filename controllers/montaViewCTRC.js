const montaViewCTRC = (req, res) => {
    let itens = req.session.res_json
    itens.empresa = req.session.empresa
    itens.cnpj    = req.session.cnpj
    res.render('pages/posicaocargactrc', itens )
}

module.exports = montaViewCTRC

