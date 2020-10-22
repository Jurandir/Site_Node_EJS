const fs                 = require('fs')
const getImageEasydocs   = require('../services/getImageEasydocs')

const downloadEaseDocs = (req, res) => {
    let { value } = req.query

    let empresa = value.substring(0,3)
    let ctrc    = value.substring(6,16)

    console.log('Aguardando Servidor: EasyDocs....')

    getImageEasydocs(empresa,ctrc ).then((resposta)=>{

          console.log('getImageEasydocs: Tem Imagem?',resposta.Retorno)

          if (resposta.isErr) {
                req.flash('msg_danger', 'Problemas com a consulta a API !!!!')
                console.log('getImageEasydocs: API Easedocs ERROR :',resposta)
                res.redirect('/posicaocarga')
          } else {
                if (resposta.Retorno) {
                    let fileName    = `Img_${empresa}${ctrc}`
                    let base64Str   =  `${resposta.Imagem}`
                    let path        ='./downloads';
                    let optionalObj = {'fileName': fileName, 'type':'png'}
                    let arq         = `${path}/${fileName}.png`                  
                    let buff        = new Buffer.from(base64Str, 'base64')

                    fs.writeFileSync(arq , buff)
                    console.log('FILE:',arq)

                    res.download(arq)
                }   
          }       
    }).catch((err)=>{ 
            console.log('getImageEasydocs - ERRO:',err)
            res.redirect('/posicaocarga')
    })
}

module.exports = downloadEaseDocs