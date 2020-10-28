const getPosicaoCobERP = require('../auth/getPosicaoCobERP')
const {ERPtoDT,NumberToReais} = require('../tools/formatar')


const montaTelaPosicaoCobERPlista = (req, res, next ) => {
    const { data_ini, data_fim  } = req.body
    let token   = req.cookies.token
    let cnpj    = req.session.cnpj
    let quitado = ''

    getPosicaoCobERP(cnpj,quitado,data_ini,data_fim,token) 
        .then((ret)=>{
            if (ret.isErr) {
                console.log('pages/posicaocoberpresult (montaTelaPosicaoCobERPlista) ret:',ret)
                req.flash('msg_danger', 'Erro na requisição a API !!!')
                res.redirect('/home')   
            } else {     
                let dados           = ret.dados

                req.session.res_json = dados             
                res.render('pages/posicaocoberpresult', {
                    empresa: req.session.empresa,
                    dados: dados,
                    ERPtoDT: ERPtoDT,
                    NumberToReais: NumberToReais
                })                
            }            
        }).catch((err)=> {
            console.log('(ERROR) montaTelaPosicaoCobERPlista :',err)
            req.flash('msg_danger', 'Problemas com o acesso a API !!!!')
            res.redirect('/home') 
        })
}

module.exports = montaTelaPosicaoCobERPlista