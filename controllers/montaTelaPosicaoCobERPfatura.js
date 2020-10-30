const getPosicaoCobERPdetalhe = require('../auth/getPosicaoCobERPdetalhe')
const {ERPtoDT,NumberToReais} = require('../tools/formatar')
const urlERPboleto            = require('../tools/urlERPboleto')

const montaTelaPosicaoCobERPfatura = (req, res) => {
    const { dados }  = req.query

    var itens     = JSON.parse(dados)
    itens.empresa = req.session.empresa

    let prefixo   = itens.E1_PREFIXO
    let fatura    = itens.E1_NUM
    let tipo      = itens.E1_TIPO
    let token     = req.cookies.token
    let urlBoleto = urlERPboleto(itens)

    getPosicaoCobERPdetalhe(prefixo,fatura,tipo,token) 
        .then((ret)=>{

            if (!ret.dados) {
                // { err, isErr ,url , params }
                req.flash('msg_danger', 'Requisição da API !!!, '+ret.err)
                res.redirect('/home')
            } else       
            if (ret.isErr) {
                req.flash('msg_danger', 'Erro na requisição a API !!!')
                res.redirect('/home')   
            } else {     
                let dados            = ret.dados

                let resumo           = ret.resumo
                req.session.res_json = dados

                itens.dados          = dados 
                itens.resumo         = resumo

                if (!resumo.QTDE) {
                    console.log('montaTelaPosicaoCobERPfatura: (Resumo ERRO em "getPosicaoCobERPdetalhe")')
                    itens.resumo.QTDE = 0
                }

                itens.ERPtoDT        = ERPtoDT
                itens.NumberToReais  = NumberToReais
                itens.urlBoleto      = urlBoleto
                
                res.render('pages/posicaocoberpfatura', itens )
            }            
        }).catch((err)=> {
            console.log('(ERROR) montaTelaPosicaoCobERPfatura :',err)
            req.flash('msg_danger', 'Problemas com o acesso a API !!!!')
            res.redirect('/home')
    })
}

module.exports = montaTelaPosicaoCobERPfatura
