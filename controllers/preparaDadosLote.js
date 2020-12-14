const getLote        = require('../auth/getLote')
const formataListaNF = require('../tools/formataListaNF')

const preparaDadosLote = (req, res, next ) => {
    let { cnpj, list_nfs } = req.body
    let token = req.cookies.token
    let reg = /^[\d,?!]+$/

    list_nfs = list_nfs.trim()

    if (!list_nfs) {
        req.flash('msg_warning', 'Numero da NF, é de preenchimento obrigatório !!!')
        res.redirect('/posicaocargalote')    
    }

    if ( !reg.test(list_nfs) ) {
        req.flash('msg_warning', 'O preenchimento deve conter apenas numeros e vírgulas !!!')
        res.redirect('/posicaocargalote')    
    }

    if (!cnpj) {
        req.flash('msg_warning', 'CNPJ, é de preenchimento obrigatório !!!')
        res.redirect('/posicaocargalote')    
    }
   
    let list_nfs1 = formataListaNF(list_nfs)

    req.session.list_nfs  = list_nfs1

    getLote(cnpj, list_nfs1, token) 
        .then((ret)=>{
            if (ret.isErr) {
                req.flash('msg_danger', 'Erro na requisição a API !!!')
                res.redirect('/posicaocargalote')    
            } else {     
                req.session.res_json = ret.dados
                next()
            }                  
        }).catch((err)=> {
            console.log('(ERROR) preparaDadosLote :',err)
            req.flash('msg_danger', 'Problemas com o acesso a API !!!!')
            res.redirect('/posicaocargalote')
        })
}
module.exports = preparaDadosLote
