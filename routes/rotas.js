const express                 = require('express')
const getToken                = require('../auth/getToken')
const getJsonDoc              = require('../auth/getJsonDoc')
const getPosicaoCargas        = require('../auth/getPosicaoCargas')
const getCteXML               = require('../auth/getCteXML')

const getBaixarXML            = require('../services/getBaixarXML')
const getDownload             = require('../services/getDownload')
const getImageEasydocs        = require('../services/getImageEasydocs')

const setCredencialCargas = require('../midwares/setCredencialCargas')

const { base64encode, base64decode } = require('nodejs-base64')

const { JSONCookie } = require('cookie-parser')
const router                  = express.Router()

require('dotenv').config()


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
router.post('/login/check', setCredencialCargas,  function(req, res, next ) {
    
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

                let { code,address,port } = ret.err

                console.log( 'ACESSO:',code,address,port )

                if (code =='ECONNREFUSED') {
                    req.flash('msg_warning', `Servidor [${address}:${port}] não responde a requisição !!!!`)
                } else {
                    req.flash('msg_danger', `Credênciais (${cnpj}/SENHA) fornecidas são invalidas !!!!`)
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

                res.redirect('/documento')
            }            
        }).catch((err)=> {
            req.flash('msg_danger', 'Problemas com o acesso a API !!!!')
            console.log('ERROR :',err)
        })
    }
})


// FORM - Posição da Carga API
router.get('/posicaocarga', (req, res) => {

    const { auth } = req.session
    if (!auth) {
        req.flash('msg_warning', 'Rediresionado - Usuário sem autenticação. !!!!')
        req.session.auth = false
        res.redirect('/login')    
    } 

    res.render('pages/posicaocarga', {
        empresa: req.session.empresa,
        cnpj: req.session.cnpj,
        data_ini: null,
        data_fim: null
    })
})

// CHECK - Posição da Carga API
router.post('/posicaocarga/lista', function(req, res, next ) {
    const { data_ini, data_fim  } = req.body
    const { auth } = req.session
    const url_base = '/posicaocarga'

    if (!auth) {
        req.session.auth = false
        req.flash('msg_warning', 'Ocorreu uma falha na autenticação !!!!')
        res.redirect('/login')    
    } 

    if (!data_ini) {
        req.flash('msg_warning', 'Data inicial invalida !!!')
        res.redirect( url_base )   
    }     

    if (!data_fim) {
        req.flash('msg_warning', 'Data final invalida !!!')
        res.redirect( url_base )   
    }     
 
    let token = req.cookies.token

    getPosicaoCargas(data_ini,data_fim,token) 
        .then((ret)=>{
            if (ret.isErr) {
                req.flash('msg_danger', 'Erro na requisição a API !!!')
                res.redirect( url_base )    
            } else {     

                let dados           = ret.dados
                req.session.res_json = dados
              
                res.render('pages/posicaocargaresult', {
                    empresa: req.session.empresa,
                    dados: dados
                })                
            }            
        }).catch((err)=> {
            req.flash('msg_danger', 'Problemas com o acesso a API !!!!')
            console.log('ERROR :',err)
        })
})

// SHOW - Resultado Posição de Carga API
router.get('/posicaocarga/ctrc', (req, res) => {
    const { dados }  = req.query

    var itens = JSON.parse(dados)
    itens.empresa = req.session.empresa

    res.render('pages/posicaocargactrc', itens )
})

// DOWNLOAD - DCTE - Usa ServeSAC Fortes
router.get('/posicaocarga/download/dcte', (req, res) => {
    let { value } = req.query

    let empresa = value.substring(0,3)
    let serie   = value.substring(4,5)
    let ctrc    = value.substring(6,16)
    let iFatura = 0
    let server = process.env.CARGAS_DOWNLOAD || 'http://192.168.0.93:9091'
    let credencial = req.cookies.chave || '{1053E116-8BDE-4420-85AA-141792FF60CD}'

    console.log('Aguardando Servidor:',server,'....')

    getBaixarXML(credencial,empresa,serie,ctrc,iFatura ).then((resposta)=>{

          console.log('getBaixarXML: $value=',resposta.return.$value)

          let arq = resposta.return.$value
          let file = arq.split('\\').join('/')
          let download = `${server}/${file}`

          file = `./downloads/DCTE_${ctrc}.ZIP`

          getDownload(download, file, () => {
                console.log('done')
                res.download(file)
          });
     
          req.flash('msg_info', 'Arquivo baixado com sucesso...')
    
    }).catch((err)=>{
    
            console.error('getBaixarXML:',err)
            req.flash('msg_info', 'Servidor:'+server+' : '+err)
            console.log('ERRO:',err)
            res.redirect('/posicaocarga')

    })
})


// DOWNLOAD - XML - Usa API Cliente
router.get('/posicaocarga/download/xml', (req, res) => {
    const { auth } = req.session
    const url_base = '/posicaocarga'

    let { value } = req.query

    if (!auth) {
        req.session.auth = false
        req.flash('msg_warning', 'Ocorreu uma falha na autenticação !!!!')
        res.redirect('/login')    
    } 
   
    let empresa = value.substring(0,3)
    let serie   = value.substring(4,5)
    let ctrc    = value.substring(6,16)

    if ((!empresa) || (!serie)  || (!ctrc)) {
        req.flash('msg_warning', 'Dados invalidos !!!')
        res.redirect( url_base )   
    }     
    
    let token = req.cookies.token

    getCteXML(empresa,serie,ctrc,token) 
    .then((ret)=>{
        if (ret.isErr) {
            req.flash('msg_danger', 'Erro na requisição a API !!!')
            res.redirect( url_base )    
        } else {     

            let dados           = ret.dados[0].XMLCTE
            req.session.res_json = dados
            
            //console.log('DADOS:', dados )

            const fileData = dados
            const fileName = `${empresa}${ctrc}.XML`
            const fileType = 'text/xml'
          
            res.writeHead(200, {
              'Content-Disposition': `attachment; filename="${fileName}"`,
              'Content-Type': fileType,
            })
          
            const download = Buffer.from(fileData, 'utf-8')
            res.end(download)
          
        }            
    }).catch((err)=> {
        req.flash('msg_danger', 'Problemas com o acesso a API !!!!')
        res.redirect( url_base )   
        console.log('ERROR :',err)
    })
})


// DOWNLOAD - COMPROVANTE - Usa WS Easydocs
router.get('/posicaocarga/download/easydocs', (req, res) => {
    let { value } = req.query

    let empresa = value.substring(0,3)
    let ctrc    = value.substring(6,16)

    console.log('Aguardando Servidor: EasyDocs')

    getImageEasydocs(empresa,ctrc ).then((resposta)=>{

          console.log('getImageEasydocs: $value=',resposta.Retorno)

          if (resposta.isErr) {
                req.flash('msg_danger', 'Problemas com a consulta a API !!!!')
                console.log('ERROR :',resposta)
                res.redirect('/posicaocarga')
          } else {
                if (resposta.Retorno) {
                    let fileData = base64decode(resposta.Imagem)
                    let fileName = `Img_${empresa}${ctrc}.BMP`
                    let fileType = 'image/bmp'
            
                res.writeHead(200, {
                'Content-Disposition': `attachment; filename="${fileName}"`,
                'Content-Type': fileType,
                })
            
                const download = Buffer.from(fileData, 'binary')
                res.end(download)
                }   


            req.flash('msg_info', 'Ação realizada com sucesso !!!')
            res.redirect('/posicaocarga')
          }    
    
    }).catch((err)=>{
    
            console.error('getImageEasydocs:',err)
            req.flash('msg_info', 'Servidor EasyDocs :'+err)
            console.log('ERRO:',err)
            res.redirect('/posicaocarga')

    })
})


module.exports = router
