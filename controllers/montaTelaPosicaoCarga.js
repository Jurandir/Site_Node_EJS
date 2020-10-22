const montaTelaPosicaoCarga = (req, res) => {
    res.render('pages/posicaocarga', {
        empresa: req.session.empresa,
        cnpj: req.session.cnpj,
        data_ini: null,
        data_fim: null
    })
}

module.exports = montaTelaPosicaoCarga