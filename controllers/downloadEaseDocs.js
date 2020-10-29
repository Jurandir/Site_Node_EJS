const fs                 = require('fs')
const getImageEasydocs   = require('../services/getImageEasydocs')

const downloadEaseDocs = (req, res) => {
    let { value } = req.query

    let empresa = value.substring(0,3)
    let ctrc    = value.substring(6,16)

    console.log('Aguardando Servidor: EasyDocs....')

    getImageEasydocs(empresa,ctrc ).then((resposta)=>{

            if (resposta.isErr) {
                  req.flash('msg_danger', 'Problemas com a consulta a API (EasyDocs) !!!!')
                  console.log('getImageEasydocs: API Easedocs ERROR :',resposta)
                  res.redirect('/posicaocarga')
            } else 
            if (!resposta.Retorno) {
                  req.flash('msg_warning', '(EasyDocs) - API - Não tem a imagem solicitada !!!!')
                  res.redirect('/posicaocarga')
            } else 
            if (resposta.Retorno) {
                        let fileName    = `Img_${empresa}${ctrc}`
                        let base64Str   =  `${resposta.Imagem}`
                        let path        ='./downloads';
                        let optionalObj = {'fileName': fileName, 'type':'png'}
                        let arq         = `${path}/${fileName}.png`                  
                        let buff        = new Buffer.from(base64Str, 'base64')
                        fs.writeFileSync(arq , buff)
                        res.download(arq)
            } else {
                        req.flash('msg_warning', '(EasyDocs) - Sem retorno !!!!')
                        res.redirect('/posicaocarga')
            }  
                 
    }).catch((err)=>{ 
            console.log('getImageEasydocs - ERRO:',err)
            res.redirect('/posicaocarga')
    })
}

module.exports = downloadEaseDocs