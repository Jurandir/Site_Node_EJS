const montaTelaPosicaoCargaNF = (req, res) => {
    res.render('pages/posicaocargaNF', {
        empresa: req.session.empresa,
        cnpj: req.session.cnpj,
        num_nf: req.session.num_nf || ''
    })
}
module.exports = montaTelaPosicaoCargaNF