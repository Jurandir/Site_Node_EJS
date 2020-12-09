const montaTelaPosicaoCargaDoc = (req, res) => {

    res.render('pages/posicaocargadoc', {
        empresa: req.session.empresa,
        cnpj: req.session.cnpj,
        cod_ctrc: req.session.cod_ctrc || ''
    })
}

module.exports = montaTelaPosicaoCargaDoc