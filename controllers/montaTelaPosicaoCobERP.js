const montaTelaPosicaoCobERP = (req, res) => {

    res.render('pages/posicaocoberp', {
        empresa: req.session.empresa,
        cnpj: req.session.cnpj,
        data_ini: req.session.data_ini,
        data_fim: req.session.data_fim
    })
}

module.exports = montaTelaPosicaoCobERP