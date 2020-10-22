const montaTelaPosicaoCarga = (req, res) => {

    res.render('pages/posicaocarga', {
        empresa: req.session.empresa,
        cnpj: req.session.cnpj,
        data_ini: req.session.data_ini,
        data_fim: req.session.data_fim
    })
}

module.exports = montaTelaPosicaoCarga