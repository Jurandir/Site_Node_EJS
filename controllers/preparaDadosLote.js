const getLote        = require('../auth/getLote')
const formataListaNF = require('../tools/formataListaNF')

const preparaDadosLote = (req, res, next ) => {
    const { cnpj, list_nfs } = req.body
    let token = req.cookies.token
    let reg = /^[\d,?!]+$/
 

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

    console.log('cnpj:',cnpj)
    console.log('list_nfs1:',list_nfs1)


    req.session.list_nfs  = list_nfs1

    getLote(cnpj, list_nfs1, token) 
        .then((ret)=>{

            console.log('RET:',ret)


            if (ret.isErr) {
                req.flash('msg_danger', 'Erro na requisição a API !!!')
                res.redirect('/posicaocargalote')    
            } else {     
                let dados            = ret.dados[0]
                req.session.res_json = dados 
                next()
            }                  
        }).catch((err)=> {
            console.log('(ERROR) preparaDadosLote :',err)
            req.flash('msg_danger', 'Problemas com o acesso a API !!!!')
            res.redirect('/posicaocargalote')
        })
}
module.exports = preparaDadosLote
