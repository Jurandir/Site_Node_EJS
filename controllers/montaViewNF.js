const montaViewNF = (req, res) => {
    let itens = req.session.res_json
    itens.empresa = req.session.empresa
    itens.cnpj    = req.session.cnpj
    itens.nova_pesquisa = '/posicaocarganf'

    res.render('pages/posicaocargactrc', itens )
}
module.exports = montaViewNF

