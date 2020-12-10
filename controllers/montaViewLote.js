const montaViewLote = (req, res) => {
    let itens = req.session.res_json
    
    if (itens==undefined) {
        req.flash('msg_warning', 'Não encontrou nenhuma NF na relação informada !!!')
        res.redirect('/posicaocargalote')            
    } else {
        itens.empresa = req.session.empresa
        itens.cnpj    = req.session.cnpj
        res.render('pages/posicaocargactrc', itens )
    }
}
module.exports = montaViewLote

