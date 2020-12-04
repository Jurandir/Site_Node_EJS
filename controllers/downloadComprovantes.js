const fs                   = require('fs')
const getImageEasydocs     = require('../services/getImageEasydocs')
const getImageAgileProcess = require('../services/getImageAgileProcess')

const downloadComprovantes = async (req, res) => {
    let { value } = req.query

    let empresa   = value.substring(0,3)
    let ctrc      = value.substring(6,16)
    let documento = value
    let resposta  = {}
    let agile_ok  = false

    try {
      resposta.isErr   = true    
      resposta = await getImageEasydocs(empresa,ctrc )
    } catch (err) {
      resposta.Retorno = false
    }

    if (resposta.Retorno==false) {
      try {    
          resposta     = await getImageAgileProcess(documento)
          agile_ok = (resposta.dados.json_response[0].checkpoint.resources[0].content_type == "PHOTO")
      } catch (err) {
         agile_ok = false;  
      }  

      if(agile_ok==true) {
            resposta.Imagem  = resposta.dados.json_response[0].checkpoint.resources[0].content
            resposta.Retorno = true
            resposta.isErr   = false
      } else {
            resposta.Imagem  = ''
            resposta.Retorno = false
      }
    }

    if (resposta.isErr) {
                  req.flash('msg_danger', 'Problemas com a consulta a API (EasyDocs/AgileProcess) !!!!')
                  console.log('ERROR: API Easydocs/AgileProcess :',resposta)
                  res.redirect('/posicaocarga')
    } else if (!resposta.Retorno) {
                  req.flash('msg_warning', '(EasyDocs/AgileProcess) - API - Não tem a imagem solicitada !!!!')
                  res.redirect('/posicaocarga')
    } else if (resposta.Retorno) {
                  let fileName    = `Img_${empresa}${ctrc}`
                  let base64Str   =  `${resposta.Imagem}`
                  let path        ='./downloads';
                  let optionalObj = {'fileName': fileName, 'type':'png'}
                  let arq         = `${path}/${fileName}.png`                  
                  let buff        = new Buffer.from(base64Str, 'base64')
                  fs.writeFileSync(arq , buff)
                  res.download(arq)
    } else {
                  req.flash('msg_warning', '(EasyDocs/AgileProcess) - Sem retorno !!!!')
                  res.redirect('/posicaocarga')
    }               
}

module.exports = downloadComprovantes