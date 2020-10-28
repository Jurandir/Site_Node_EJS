const getPosicaoCargas = require('../auth/getPosicaoCargas')

const montaTelaPosicaoCargaLista = (req, res, next ) => {
    const { data_ini, data_fim  } = req.body
    let token = req.cookies.token

    getPosicaoCargas(data_ini,data_fim,token) 
        .then((ret)=>{
            if (ret.isErr) {
                req.flash('msg_danger', 'Erro na requisição a API !!!')
                res.redirect('/home')    
            } else {     
                let dados           = ret.dados
                req.session.res_json = dados             
                res.render('pages/posicaocargaresult', {
                    empresa: req.session.empresa,
                    dados: dados
                })                
            }            
        }).catch((err)=> {
            console.log('(ERROR) montaTelaPosicaoCargaLista :',err)
            req.flash('msg_danger', 'Problemas com o acesso a API !!!!')
            res.redirect('/home') 
        })
}

module.exports = montaTelaPosicaoCargaLista