
const montaTelaPosicaoCobERPfatura = (req, res) => {
    const { dados }  = req.query

    var itens = JSON.parse(dados)
    itens.empresa = req.session.empresa

    res.render('pages/posicaocoberpfatura', itens )
}

module.exports = montaTelaPosicaoCobERPfatura
