const express                 = require('express')
const getToken                = require('../auth/getToken')
const router                  = express.Router()


// Verifica se está autenticado
router.get('/', (req, res) => {
    let { auth } = req.session
    if (!auth) {
        res.redirect('/login')    
    } else {
        res.redirect('/documento')    
    }
})

// FORM - Documento API
router.get('/documento', (req, res) => {
    const { doc }  = req.cookies
    let docs = JSON.parse( doc )

    res.render('pages/documento', {
        cnpj: docs.P1,
        numero: docs.P2,
        serie: docs.P3
    })
})

// CHECK - Documento API
router.post('/documento/check', function(req, res, next ) {
    const { cnpj, numero, serie  } = req.body

    if (!cnpj) {
        req.session.erro = 'Documento não encontrado na base de dados'        
        res.redirect('/documento')    
    } else {
        let docs = `{"P1":"${cnpj}","P2":"${numero}","P3":"${serie}"}`
        res.cookie('doc', docs)
        req.session.cnpj = cnpj
        res.redirect('/resultado')    
    }
})

// SHOW - Resultado API
router.get('/resultado', (req, res) => {
    const { doc }  = req.cookies
    let docs = JSON.parse( doc )

    res.render('pages/resultado', {
        cnpj: docs.P1,
        numero: docs.P2,
        serie: docs.P3,
        texto: req.session.res_json
    })
})


// FORM - Login
router.get('/login', function(req, res) {
    res.render('pages/login')
})

// CHECK - Login
router.post('/login/check', function(req, res, next ) {
    let { cnpj, pwd } = req.body
    if (!cnpj) {
        req.session.auth = false
        req.session.cnpj = ''
        req.session.user = ''
        req.session.res_json = 'Teste de texto'
        res.redirect('/login')    
    } else {
        req.session.auth = true
        req.session.cnpj = cnpj        
        req.session.user = cnpj 
        
        let { doc } = req.cookies

        if (!doc) {
           res.cookie('doc','{"P1":"","P2":"","P3":""}', { maxAge: 900000, httpOnly: true })
        }
        getToken(cnpj,pwd)
        .then((ret)=>{
            if (ret.isAuthError) {
                console.log('Login invalido ')
                 res.redirect('/login')    
            } else {     
                console.log(ret)
                ///////--- ler token ------
                let token = ret.dados.token
                console.log('token=>',token)
                res.cookie('token',token, { maxAge: 900000, httpOnly: true })

                 res.redirect('/documento')    
            }            
        }).catch((err)=> {
            console.log('ERROR =>',err)
        })
    }
})


module.exports = router
