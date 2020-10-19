const soap = require('soap')
require('dotenv').config();

const url = process.env.CARGAS_SOAP_URL

const getBaixarXML = function(credencial,empresa,serie,ctrc,iFatura) { 
    return new Promise( function(resolve, reject) {
        soap.createClient(url, function(err, client) {
            client.BaixarXML({ Credencial: credencial, Empresa: empresa, Serie: serie, Ctrc: ctrc, iFatura : iFatura }, function(err, result) {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }    
            })
        })
    })
}

module.exports = getBaixarXML