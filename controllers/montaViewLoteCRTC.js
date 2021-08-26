const url =  process.env.URL_POSICAOCARGA+'STATUS'
const getCTRC = require('../auth/getCTRC')

const montaViewLoteCRTC = async (req, res) => {
    let { cod_ctrc } = req.query
    let token = req.cookies.token
    let itens = {}

    if(!cod_ctrc){
        req.flash('msg_warning','CTRC invalido !!!')
        res.redirect('/posicaocargalote')    
    }

    let checkFormato = `${cod_ctrc}`.substr(3,1)+`${cod_ctrc}`.substr(5,1)

    if (checkFormato!='--') {
        req.flash('msg_warning', 'Formato CTRC inválido !!!')
        res.redirect('/posicaocargalote')    
    }    

    // XXX-X-99999999
    let empresa   = `${cod_ctrc}`.substr(0,3)
    let serie     = `${cod_ctrc}`.substr(4,1)
    let numero    = `${cod_ctrc}`.substr(6,10)  
    
    // console.log('==>',empresa,serie,numero)

    req.session.cod_ctrc = cod_ctrc

    getCTRC(empresa, serie, numero, token) 
        .then(async (ret)=>{
            let len = ret.dados.length || 0
            if (len <= 0) {
                req.flash('msg_info', 'CTRC não localizada na base Sênior !!!')
                res.redirect('/posicaocargalote')    
            } else  
            if (ret.isErr) {
                req.flash('msg_danger', 'Erro na requisição a API !!!')
                res.redirect('/posicaocargalote')    
            } else { 
                // console.log('req.session:',req.session)
                // console.log('req.session:',req.session.empresa)

                itens         = ret.dados[0] || {}
                itens.empresa = req.session.empresa
                itens.cnpj    = req.session.cnpj
                req.session.res_json = ret.dados[0]
                itens.nova_pesquisa = '/posicaocargalote'

                let statusAPI = await loadAPI('GET','',url,{ ctrc: itens.CONHECIMENTO })
                itens.STATUS = statusAPI.dados.status
  
                res.render('pages/posicaocargactrc', itens )
            }                  
        }).catch((err)=> {
            console.log('(ERROR) montaViewLoteCRTC :',err)
            req.flash('msg_danger', 'Problemas com o acesso a API !!!!')
            res.redirect('/posicaocargalote')
        })
}
module.exports = montaViewLoteCRTC
