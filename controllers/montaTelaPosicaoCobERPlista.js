const getPosicaoCobERP = require('../auth/getPosicaoCobERP')

const montaTelaPosicaoCobERPlista = (req, res, next ) => {
    const { data_ini, data_fim  } = req.body
    let token   = req.cookies.token
    let cnpj    = req.session.cnpj
    let quitado = ''

    getPosicaoCobERP(cnpj,quitado,data_ini,data_fim,token) 
        .then((ret)=>{
            if (ret.isErr) {
                req.flash('msg_danger', 'Erro na requisição a API !!!')
                res.redirect('back')   
            } else {     
                let dados           = ret.dados
                
                console.log('pages/posicaocoberpresult (montaTelaPosicaoCobERPlista) ret:',ret)

                req.session.res_json = dados             
                res.render('pages/posicaocoberpresult', {
                    empresa: req.session.empresa,
                    dados: dados
                })                
            }            
        }).catch((err)=> {
            console.log('(ERROR) montaTelaPosicaoCobERPlista :',err)
            req.flash('msg_danger', 'Problemas com o acesso a API !!!!')
        })
}

module.exports = montaTelaPosicaoCobERPlista