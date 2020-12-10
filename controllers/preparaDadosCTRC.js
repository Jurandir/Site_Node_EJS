const getCTRC = require('../auth/getCTRC')

const preparaDadosCTRC = (req, res, next ) => {
    const { cod_ctrc  } = req.body
    let token = req.cookies.token

    // XXX-X-99999999
    let empresa   = `${cod_ctrc}`.substr(0,3)
    let serie     = `${cod_ctrc}`.substr(4,1)
    let documento = `${cod_ctrc}`.substr(6,10)

    if (!cod_ctrc) {
        req.flash('msg_warning', 'CTRC, é de preenchimento obrigatório !!!')
        res.redirect('/posicaocargadoc')    
    }    

    let checkFormato = `${cod_ctrc}`.substr(3,1)+`${cod_ctrc}`.substr(5,1)

    if (checkFormato!='--') {
        req.flash('msg_warning', 'Formato inválido, use ( XXX-X-99999999 ), FILIAL-SERIE-CTRC !!!')
        res.redirect('/posicaocargadoc')    
    }    

    req.session.cod_ctrc = cod_ctrc

    getCTRC(empresa, serie, documento, token) 
        .then((ret)=>{
            if (ret.isErr) {
                req.flash('msg_danger', 'Erro na requisição a API !!!')
                res.redirect('/posicaocargadoc')    
            } else {     
                let dados            = ret.dados[0]
                req.session.res_json = dados 
                next()
            }                  
        }).catch((err)=> {
            console.log('(ERROR) montaTelaPosicaoCargaDoc :',err)
            req.flash('msg_danger', 'Problemas com o acesso a API !!!!')
            res.redirect('/posicaocargadoc')
        })
}
module.exports = preparaDadosCTRC
