const getCteXML   = require('../auth/getCteXML')

const downloadXML = (req, res) => {
    const { auth } = req.session
    const url_base = req.session.url_base 
    const utl_login = req.session.url_login

    let { value } = req.query

    if (!auth) {
        req.session.auth = false
        req.flash('msg_warning', 'Ocorreu uma falha na autenticação !!!!')
        res.redirect( utl_login )    
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
        res.redirect( url_base )   
        console.log('ERROR :',err)
    })
}

module.exports = downloadXML