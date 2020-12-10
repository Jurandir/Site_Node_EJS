const getNF = require('../auth/getNF')

const preparaDadosNF = (req, res, next ) => {
    const { cnpj, num_nf  } = req.body
    let token = req.cookies.token

    if (!num_nf) {
        req.flash('msg_warning', 'Numero da NF, é de preenchimento obrigatório !!!')
        res.redirect('/posicaocarganf')    
    }

    if (!cnpj) {
        req.flash('msg_warning', 'CNPJ, é de preenchimento obrigatório !!!')
        res.redirect('/posicaocarganf')    
    }

    req.session.num_nf = num_nf

    getNF(cnpj, num_nf, token) 
        .then((ret)=>{
            if (ret.isErr) {
                req.flash('msg_danger', 'Erro na requisição a API !!!')
                res.redirect('/posicaocarganf')    
            } else {     
                let dados            = ret.dados[0]
                req.session.res_json = dados 
                next()
            }                  
        }).catch((err)=> {
            console.log('(ERROR) preparaDadosNF :',err)
            req.flash('msg_danger', 'Problemas com o acesso a API !!!!')
            res.redirect('/posicaocarganf')
        })
}
module.exports = preparaDadosNF
