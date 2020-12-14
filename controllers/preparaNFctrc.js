const getNFsCTRC = require('../auth/getNFsCTRC')

const preparaNFctrc = (req, res, next ) => {
    const { cod_ctrc  } = req.query
    let token = req.cookies.token

    if (!cod_ctrc) {
        req.flash('msg_warning', 'Numero da CTRC, é de preenchimento obrigatório !!!')
        res.redirect('/home')    
    }

    req.session.cod_ctrc = cod_ctrc

    getNFsCTRC(cod_ctrc, token) 
        .then((ret)=>{
            if (ret.isErr) {
                req.flash('msg_danger', 'Erro na requisição a API !!!')
                res.redirect('/home')    
            } else {     

                let dados = ret.dados
                let cnpj  = ret.dados[0].EMITENTE_NFE || req.session.user
                let NFs = dados.map((itens)=>{
                    return itens.NF
                })

                req.session.list_nfs = NFs.join(',')
                req.session.cnpj     = cnpj

                req.session.res_json = dados 
                next()
            }                  
        }).catch((err)=> {
            console.log('(ERROR) preparaNFctrc :',err)
            req.flash('msg_danger', 'Problemas com o acesso a API !!!!')
            res.redirect('/home')
        })
}
module.exports = preparaNFctrc
