const soap = require('soap')
require('dotenv').config();

const url = process.env.CARGAS_SOAP_URL

const getCredencialCNPJ = function(cnpj,senha) { 
    return new Promise( function(resolve, reject) {
        soap.createClient(url, function(err, client) {
            client.efetuaLogin({ cliente: cnpj, senha: senha  }, function(err, result) {
                if(err) {
                    reject(err)
                } else {
                    resolve(result.return.credencial.$value)
                }    
            })
        })
    })
}

module.exports = getCredencialCNPJ