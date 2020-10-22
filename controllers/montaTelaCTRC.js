
const montaTelaCTRC = (req, res) => {
    const { dados }  = req.query

    var itens = JSON.parse(dados)
    itens.empresa = req.session.empresa

    res.render('pages/posicaocargactrc', itens )
}

module.exports = montaTelaCTRC
