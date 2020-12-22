const getJsonDoc = require('../auth/getJsonDoc')

const obterDadosAPI = (req, res, next ) => {
    const { cnpj, numero, serie  } = req.body
    const { auth, url_login } = req.session

    if (!auth) {
        req.session.auth = false
        req.flash('msg_warning', 'Ocorreu uma falha na autenticação !!!!')
        res.redirect( url_login )    
    } 

    if (!numero) {
        req.flash('msg_warning', 'CNPJ ou CPF invalidos !!!!')
        res.redirect('/documento')   
    }     

    if (!cnpj) {
        req.flash('msg_warning', 'CNPJ ou CPF invalidos !!!!')
        res.redirect('/documento')    
    }
    
    let token = req.cookies.token

    getJsonDoc(cnpj,numero,serie,token)
        .then((ret)=>{
            if (ret.isErr) {
                req.flash('msg_danger', 'Erro na requisição a API !!!')
                res.redirect('/documento')    
            } else {     

                let dados           = ret.dados
                req.session.res_json = dados

                let docs = `{"P1":"${cnpj}","P2":"${numero}","P3":"${serie}"}`
                res.cookie('doc', docs)
                req.session.cnpj = cnpj
                res.redirect('/resultado')           

            }            
        }).catch((err)=> {
            console.log('(ERRO) getJsonDoc:',err)
            req.flash('msg_danger', 'Problemas com o acesso a API !!!!')
            res.redirect('/home')
        })
}

module.exports = obterDadosAPI
