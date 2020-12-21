loadAPI = require('../services/loadAPI')

require('dotenv').config();

const url = process.env.URL_API_AD

const getCredencialAD = function(cnpj,usuario,senha) { 
    return new Promise( async function(resolve, reject) {

        let method   = 'POST'
        let endpoint = ''
        let server   = url
        let params = {
            cnpj: cnpj,
            usuario: usuario,
            senha: senha
        }
       try {
           retorno = await loadAPI(method,endpoint,server,params)           
           resolve(retorno)
       } catch(err) {
           reject({erro: err})
       }
     })
}

module.exports = getCredencialAD