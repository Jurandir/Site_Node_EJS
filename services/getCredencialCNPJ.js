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
                    try {
                       resolve(result.return.credencial.$value)
                    } catch (err1) {
                        reject({ mensagem: "Não Obteve credencias no ServiSAC !!!",err: err1})
                    }

                }    
            })
        })
    })
}

module.exports = getCredencialCNPJ