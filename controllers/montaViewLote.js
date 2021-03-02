const montaViewLote = (req, res) => {
    let itens = {}
    let dados = req.session.res_json
    
    if (dados==undefined) {
        req.flash('msg_warning', 'Não encontrou nenhuma NF na relação informada !!!')
        res.redirect('/posicaocargalote')            
    } else {
        itens.empresa = req.session.empresa
        itens.cnpj    = req.session.cnpj
        itens.dados   = dados

        console.log('ITENS:',itens)

        res.render('pages/posicaocargaLoteList', itens )
    }
}
module.exports = montaViewLote

