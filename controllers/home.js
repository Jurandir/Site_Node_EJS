const home = (req, res) => {
    const url_login = req.session.url_login
    var itens = {}
    
    let cliente = req.session.cliente

    itens = {
        "empresa": req.session.empresa,
        "nome": cliente.dados.NOME,
        "senha": cliente.dados.SENHA,
        "razao": cliente.dados.RAZAO,
        "cnpj": cliente.dados.CNPJ,
        "ei": cliente.dados.IE,
        "endereco": cliente.dados.ENDERECO,
        "numero": cliente.dados.NUMERO,
        "bairro": cliente.dados.BAIRRO,
        "cidade": cliente.dados.CIDADE,
        "cep": cliente.dados.CEP
     }

    try {
       
       
        console.log('itens:',itens)


       res.render('pages/home', itens )
    } catch (err) {
        console.log('(ERRO) home.js : ',err)
        req.flash('msg_info', 'Entre novamente com suas credênciais !!!')
        res.redirect(url_login) 
    }
}

module.exports = home