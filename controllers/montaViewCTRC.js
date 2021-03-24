const url =  process.env.URL_POSICAOCARGA+'STATUS'

const montaViewCTRC = async (req, res) => {
    let itens = req.session.res_json
    itens.empresa = req.session.empresa
    itens.cnpj    = req.session.cnpj
    itens.nova_pesquisa = '/posicaocargadoc'

    let statusAPI = await loadAPI('GET','',url,{ ctrc: itens.CONHECIMENTO })
    itens.STATUS = statusAPI.dados.status

    res.render('pages/posicaocargactrc', itens )
}

module.exports = montaViewCTRC

