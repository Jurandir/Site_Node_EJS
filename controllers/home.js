const home = (req, res) => {
    const { dados }  = req.query
    var itens = JSON.parse(dados)
    
    itens.empresa = req.session.empresa

    res.render('pages/home', itens )
}

module.exports = home