
require('dotenv').config()

const PDFeDocs =   process.env.URL_PDFEDOCS

const downloadeDocs = (req, res) => {
    let { value } = req.query
    try {
      // console.log('Aguardando Servidor:....',value)
      req.flash('msg_info', 'Arquivo baixado com sucesso...')
      res.redirect(`${PDFeDocs}?chave=${value}&B64_Lnk_Down=D`)

    } catch(err) {
      req.flash('msg_info', err)
      res.redirect('/posicaocarga')

    }
}

module.exports = downloadeDocs