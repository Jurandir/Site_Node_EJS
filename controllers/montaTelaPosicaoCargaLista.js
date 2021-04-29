const getPosicaoCargas     = require('../auth/getPosicaoCargas')
const getPosicaoCargasXLS  = require('../auth/getPosicaoCargasXLS')

const montaTelaPosicaoCargaLista = async (req, res, next ) => {
    const {  gera_excel ,data_ini, data_fim  } = req.body
    let token = req.cookies.token

    req.session.data_ini   = data_ini 
    req.session.data_fim   = data_fim
    req.session.gera_excel = gera_excel===undefined ? false : true

    if(data_ini>data_fim) {
        req.flash('msg_warning', 'Data final superior a data inicial !!!')
        res.redirect('/posicaocarga')  
    }
    
    let xls 
    if(req.session.gera_excel){
       xls = await getPosicaoCargasXLS(data_ini,data_fim,token) 
    }

    getPosicaoCargas(data_ini,data_fim,token) 
        .then((ret)=>{
            if (ret.isErr) {
                req.flash('msg_danger', 'Erro na requisição a API !!!')
                res.redirect('/home')    
            } else {     
                let dados           = ret.dados
                dados.gerou_xls     = req.session.gera_excel
                if(dados.gerou_xls){
                    dados.xls ={
                        data_ini: xls.dados.dataini,
                        data_fim: xls.dados.datafim,
                        download: xls.dados.download,
                        maxLines: xls.dados.maxLines
                    }
                } 

                req.session.res_json = dados 

                console.log('dados:',dados)

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