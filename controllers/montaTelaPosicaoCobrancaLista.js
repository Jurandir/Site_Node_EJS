const getPosicaoCobranca = require('../auth/getPosicaoCobranca')

const montaTelaPosicaoCobrancaLista = (req, res, next ) => {
    const { data_ini, data_fim  } = req.body
    let token   = req.cookies.token
    let cnpj    = req.session.cnpj
    let quitado = ''

    req.session.data_ini = data_ini 
    req.session.data_fim = data_fim

    if(data_ini>data_fim) {
        req.flash('msg_warning', 'Data final superior a data inicial !!!')
        res.redirect('/posicaocoberp')  
    }
    
    getPosicaoCobranca(cnpj,quitado,data_ini,data_fim,token) 
        .then((ret)=>{
            if (ret.isErr) {
                req.flash('msg_danger', 'Erro na requisição a API !!!')
                res.redirect('/home')  
            } else {     
                let dados           = ret.dados
              
                req.session.res_json = dados             
                res.render('pages/posicaocobrancaresult', {
                    empresa: req.session.empresa,
                    dados: dados
                })                
            }            
        }).catch((err)=> {
            console.log('(ERROR) montaTelaPosicaoCobrancaLista :',err)
            req.flash('msg_danger', 'Problemas com o acesso a API !!!!')
            res.redirect('/home')
        })
}

module.exports = montaTelaPosicaoCobrancaLista