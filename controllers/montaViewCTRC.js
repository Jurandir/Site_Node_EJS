const montaViewCTRC = (req, res) => {
    let itens = req.session.res_json
    itens.empresa = req.session.empresa
    itens.cnpj    = req.session.cnpj
    itens.nova_pesquisa = '/posicaocargadoc'
    res.render('pages/posicaocargactrc', itens )
}

module.exports = montaViewCTRC

