const getBaixarXML   = require('../services/getBaixarXML')
const getDownload    = require('../services/getDownload')


require('dotenv').config()

const downloadServeSACdcte = (req, res) => {
    let { value } = req.query

    let empresa = value.substring(0,3)
    let serie   = value.substring(4,5)
    let ctrc    = value.substring(6,16)
    let iFatura = 0
    let server = process.env.CARGAS_DOWNLOAD || 'http://192.168.0.31:9091'
    let credencial = req.cookies.chave || '{1053E116-8BDE-4420-85AA-141792FF60CD}'

    console.log('Aguardando Servidor:',server,'....')

    getBaixarXML(credencial,empresa,serie,ctrc,iFatura ).then((resposta)=>{

          let arq = resposta.return.$value
          let file = arq.split('\\').join('/')
          let download = `${server}/${file}`

          file = `./downloads/DCTE_${ctrc}.ZIP`

          getDownload(download, file, () => {
                res.download(file)
          });
     
          req.flash('msg_info', 'Arquivo baixado com sucesso...')
    
    }).catch((err)=>{
    
            console.error('(ERRO) getBaixarXML:',err)
            req.flash('msg_info', 'Servidor:'+server+' : '+err)
            res.redirect('/posicaocarga')

    })
}

module.exports = downloadServeSACdcte