
const montaTelaCTRC = (req, res) => {
    const { dados }  = req.query
    
    if (dados) {
        var itens = JSON.parse(dados)
        itens.empresa = req.session.empresa
        res.render('pages/posicaocargactrc', itens )
    } else {
        res.redirect('/home')
    }    
}

module.exports = montaTelaCTRC
