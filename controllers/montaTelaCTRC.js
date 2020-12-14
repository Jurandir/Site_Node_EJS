const montaTelaCTRC = (req, res) => {
    const { dados }  = req.query
    try {
        if (dados) {
            var dados_decode = Buffer.from( dados ,"base64").toString("utf-8")
            var itens = JSON.parse( dados_decode )
            itens.empresa = req.session.empresa
            itens.nova_pesquisa = '/posicaocarga'
            res.render('pages/posicaocargactrc', itens )
        } else {
            res.redirect('/home')
        }    
    } catch (err) {
        console.log('Erro:',err)
        console.log('Dados:',dados)
        res.redirect('/home')
    }
}

module.exports = montaTelaCTRC
