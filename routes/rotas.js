const express                 = require('express')
const getToken                = require('../auth/getToken')
const getJsonDoc              = require('../auth/getJsonDoc')
const { JSONCookie } = require('cookie-parser')
const router                  = express.Router()

// Verifica se está autenticado
router.get('/', (req, res) => {
    let { auth } = req.session

    req.flash('msg_success', '')
    req.flash('msg_info', '')
    req.flash('msg_warning', '')
    req.flash('msg_danger', '')

    if (!auth) {
        req.session.auth = false
        res.redirect('/login')    
    } else {
        res.redirect('/documento')    
    }

})

// FORM - Documento API
router.get('/documento', (req, res) => {

    const { auth } = req.session
    if (!auth) {
        req.flash('msg_warning', 'Rediresionado - Usuário sem autenticação. !!!!')
        req.session.auth = false
        res.redirect('/login')    
    } 

    const { doc }  = req.cookies
    let docs = JSON.parse( doc )

    res.render('pages/documento', {
        empresa: req.session.empresa,
        cnpj: docs.P1,
        numero: docs.P2,
        serie: docs.P3
    })
})

// CHECK - Documento API
router.post('/documento/check', function(req, res, next ) {
    const { cnpj, numero, serie  } = req.body
    const { auth } = req.session

    if (!auth) {
        req.session.auth = false
        req.flash('msg_warning', 'Ocorreu uma falha na autenticação !!!!')
        res.redirect('/login')    
    } 

    if (!numero) {
        req.flash('msg_warning', 'CNPJ ou CPF invalidos !!!!')
        res.redirect('/documento')   
    }     

    if (!cnpj) {
        req.flash('msg_warning', 'CNPJ ou CPF invalidos !!!!')
        res.redirect('/documento')    
    }
    
    console.log('SESSION :',req.session)
    console.log('COOKIES :',req.cookies)

    let token = req.cookies.token
    console.log('PARAMETROS :',cnpj,numero,serie,token)

    getJsonDoc(cnpj,numero,serie,token)
        .then((ret)=>{
            if (ret.isErr) {
                req.flash('msg_danger', 'Erro na requisição a API !!!')
                res.redirect('/documento')    
            } else {     

                let dados           = ret.dados
                req.session.res_json = dados

                console.log('RETORNO :',dados)

                let docs = `{"P1":"${cnpj}","P2":"${numero}","P3":"${serie}"}`
                res.cookie('doc', docs)
                req.session.cnpj = cnpj
                res.redirect('/resultado')           

            }            
        }).catch((err)=> {
            req.flash('msg_danger', 'Problemas com o acesso a API !!!!')
            console.log('ERROR :',err)
        })
})

// SHOW - Resultado API
router.get('/resultado', (req, res) => {
    const { doc }  = req.cookies
    let docs = JSON.parse( doc )

    let res_json = JSON.stringify(req.session.res_json, null,"\t")

    res.render('pages/resultado', {
        empresa: req.session.empresa,
        cnpj: docs.P1,
        numero: docs.P2,
        serie: docs.P3,
        texto: res_json
    })
})

// FORM - Logout
router.get('/logout', function(req, res) {
    req.session.auth    = false
    req.session.cnpj    = ''
    req.session.user    = ''
    req.session.empresa = ''
    res.clearCookie('user_sid')
    res.clearCookie('doc')
    req.flash('msg_info', 'Logout realizado com sucesso !!!!')
    res.redirect('/login') 
})

// FORM - Login
router.get('/login', function(req, res) {
    res.render('pages/login')
})

// CHECK - Login
router.post('/login/check', function(req, res, next ) {
    
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
                req.flash('msg_danger', `Credênciais (${cnpj}/SENHA) fornecidas são invalidas !!!!`)
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

                res.redirect('/documento')
            }            
        }).catch((err)=> {
            req.flash('msg_danger', 'Problemas com o acesso a API !!!!')
            console.log('ERROR :',err)
        })
    }
})

module.exports = router
