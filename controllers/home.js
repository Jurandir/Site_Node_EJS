const home = (req, res) => {
    try {
       var itens = {}
       itens.empresa = req.session.empresa
       res.render('pages/home', itens )
    } catch (err) {
        console.log('(ERRO) home.js : ',err)
        req.flash('msg_info', 'Entre novamente com suas credênciais !!!')
        res.redirect('/login') 
    }
}

module.exports = home