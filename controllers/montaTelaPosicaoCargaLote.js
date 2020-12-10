const montaTelaPosicaoCargaLote = (req, res) => {
    res.render('pages/posicaocargaLote', {
        empresa: req.session.empresa,
        cnpj: req.session.cnpj,
        list_nfs : req.session.list_nfs  || ''
    })
}
module.exports = montaTelaPosicaoCargaLote