const soap = require('soap')
require('dotenv').config();

const url = process.env.CARGAS_SOAP_URL

const getCredencialUSER = function(sUsuario,sSenha,sCnpj) { 
    return new Promise( function(resolve, reject) {
        soap.createClient(url, function(err, client) {
            client.efetuaLoginEmpresa({ sUsuario: sUsuario, sSenha: sSenha, sCnpj: sCnpj  }, function(err, result) {
                if(err) {
                    reject(err)
                } else {
                    resolve(result.return.credencial.$value)
                }    
            })
        })
    })
}

module.exports = getCredencialUSER