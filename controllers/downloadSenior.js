const fs                   = require('fs')
const http                 = require('http')
const zip                  = require('express-zip');
const getImageSenior       = require('../services/getImageSenior')

const downloadSenior = async (req, res) => {
    let { value } = req.query

    let ctrc      = value.substring(0,3)+'E'+value.substring(6,16)
    let resposta  =  { success: false, message: '', data: [], rows: 0 }

    try {
      let ret = await getImageSenior( ctrc )
      resposta.message = `CTRC: ${ctrc}`
      resposta.data    = ret.dados
      resposta.rows    = resposta.data.length
      resposta.success = ( resposta.rows>0 )

    } catch (err) {
      resposta.message = err.message
      resposta.rows = -1
    }

    if(!resposta.success) {
      req.flash('msg_warning', `Não localizou o comprovante na base de dados !!!,  API: ${resposta.message} `)
      res.redirect('/posicaocarga')
      return 0
    }

    let zip = []

    for await (let itn of resposta.data) {
      let url = itn.url
      let fileLocation = './downloads/'+itn.file
      zip.push({ path: fileLocation, name: itn.file })
  
      await pDownload(url, fileLocation)
      .then( ()=> console.log(`downloaded "${fileLocation}" file no issues...`))
      .catch( e => console.error('error while downloading', e));    
  
    }

    res.zip(zip,'Comprovantes.zip', delFiles )

    function delFiles() {
      zip.map(itn=>{
        fs.unlink(itn.path,function(err){
          if(err) return console.log(err);
          console.log(`file "${itn.path}" deleted successfully`);
      })
      })
    }
    
}

// https://stackoverflow.com/questions/11944932/how-to-download-a-file-with-node-js-without-using-third-party-libraries
function pDownload(url, dest){
  var file = fs.createWriteStream(dest);
  return new Promise((resolve, reject) => {
    var responseSent = false; // flag to make sure that response is sent only once.
    http.get(url, response => {
      response.pipe(file);
      file.on('finish', () =>{
        file.close(() => {
          if(responseSent)  return;
          responseSent = true;
          resolve();
        });
      });
    }).on('error', err => {
        if(responseSent)  return;
        responseSent = true;
        reject(err);
    });
  });
}

module.exports = downloadSenior