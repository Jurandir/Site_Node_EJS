const getPosicaoCargas = require('../auth/getPosicaoCargas')

const montaTelaPosicaoCargaLista = (req, res, next ) => {
    const { data_ini, data_fim  } = req.body
    const url_base = '/posicaocarga'

    if (!data_ini) {
        req.flash('msg_warning', 'Data inicial invalida !!!')
        res.redirect( url_base )   
    }     

    if (!data_fim) {
        req.flash('msg_warning', 'Data final invalida !!!')
        res.redirect( url_base )   
    }     
    
    req.session.data_ini = data_ini
    req.session.data_fim = data_fim

    let token = req.cookies.token

    getPosicaoCargas(data_ini,data_fim,token) 
        .then((ret)=>{
            if (ret.isErr) {
                req.flash('msg_danger', 'Erro na requisição a API !!!')
                res.redirect( url_base )    
            } else {     

                let dados           = ret.dados
                req.session.res_json = dados
              
                res.render('pages/posicaocargaresult', {
                    empresa: req.session.empresa,
                    dados: dados
                })                
            }            
        }).catch((err)=> {
            req.flash('msg_danger', 'Problemas com o acesso a API !!!!')
            console.log('ERROR :',err)
        })
}

module.exports = montaTelaPosicaoCargaLista