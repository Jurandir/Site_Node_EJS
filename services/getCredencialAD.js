require('dotenv').config();

const url = process.env.URL_API_AD

const getCredencialAD = function(cnpj,senha) { 
    return new Promise( function(resolve, reject) {
        resolve({implementar: true})
     })
}

module.exports = getCredencialAD