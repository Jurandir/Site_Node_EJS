const getToken = require('../auth/getToken')

require('dotenv').config()

const checkLogin = (req, res, next ) => {
    
    let { cnpj, pwd } = req.body
    let { doc }       = req.cookies

    if (!doc) {
        doc = '{"P1":"","P2":"","P3":""}'
        res.cookie('doc',doc, { maxAge: 900000, httpOnly: true })
     } 
     
     let docs = JSON.parse( doc )
     
    if (!cnpj) {
        req.session.auth = false
        req.session.cnpj = ''
        req.session.user = ''
        req.session.empresa = ''
        req.session.data_ini = new Date()
        req.session.data_fim = new Date()
    
        req.session.res_json = 'Teste de texto'
        req.flash('msg_warning', 'Dados obrigatorios para acesso !!!!')
        res.redirect('/login')    
    } else {
        req.session.auth    = true
        req.session.cnpj    = cnpj        
        req.session.user    = cnpj 
        req.session.empresa = ''       

        getToken(cnpj,pwd)
        .then((ret)=>{
            if (ret.isAuthError) {

                let { code,address,port } = ret.err

                let ambiente = process.env.NODE_ENV
                let acesso = 'Acesso:'+ambiente+', Cód: "'+code+'" / '+address+':'+port
                console.log( acesso )

                if (code =='ECONNREFUSED') {
                    req.flash('msg_warning', `Servidor API - Não responde a requisição !!!! ( ${acesso} )`)
                } else {
                    req.flash('msg_danger', `Credênciais (${cnpj}/SENHA) fornecidas são invalidas !!!! ( ${acesso} )`)
                }
                res.redirect('/login')    
            } else {     

                let dados           = ret.dados
                let token           = dados.token
                res.locals.empresa  = dados.name
                req.session.empresa = dados.name
                res.locals.login    = dados.login

                res.cookie('token',token, { maxAge: 900000, httpOnly: true })
                
                empresa = req.session.empresa
                cnpj    = docs.P1 || dados.login
                numero  = docs.P2 || ''
                serie   = docs.P3 || ''

                docs = `{"P1":"${cnpj}","P2":"${numero}","P3":"${serie}"}`
                res.cookie('doc', docs)

                res.redirect('/posicaocarga')
            }            
        }).catch((err)=> {
            req.flash('msg_danger', 'Problemas com o acesso a API !!!!')
            console.log('ERROR :',err)
        })
    }
}

module.exports = checkLogin
