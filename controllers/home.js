const home = (req, res) => {
    try {
       var itens = JSON.parse(dados)   
       itens.empresa = req.session.empresa
       res.render('pages/home', itens )
    } catch (err) {
        console.log('(ERRO) home.js : ',err)
        req.flash('msg_info', 'Entre novamente com suas credênciais !!!')
        res.redirect('/logout') 
    }
}

module.exports = home