const montaViewNF = (req, res) => {
    let itens = {}    
    if(req.session.res_json) {
        
        itens               = req.session.res_json
        itens.empresa       = req.session.empresa
        itens.cnpj          = req.session.cnpj
        itens.nova_pesquisa = '/posicaocarganf'

        res.render('pages/posicaocargactrc', itens )

    } else {
        req.flash('msg_warning', 'NF não encontrada para o CNPJ informado !!!')
        res.redirect('/posicaocarganf')    
    }
    
}
module.exports = montaViewNF

