'use strict'

const soap = require('soap')
require('dotenv').config();

const url = process.env.EASYDOCS_SOAP_URL

const getImageEasydocs = 
function(CodigoFilial,NumeroConhecimento) { 
    return new Promise( function(resolve, reject) {
        soap.createClient(url, function(err, client) {

            let params = {   
                CodigoCliente : 160, 
                CodEmpresa: 0, 
                CodigoFilial: CodigoFilial, 
                NumeroConhecimento: NumeroConhecimento 
            }
            
            client.addHttpHeader('Content-Type','text/xml;charset=UTF-8')
            client.addHttpHeader('Accept-Encoding','gzip,deflate')

            client.wsimagens.wsimagensSoap.Recupera_ImagemQtd(params,
                function(err, result) {
                    if(err) {
                        reject(err)
                        //reject({Erro:'Erro'})
                    } else {
                        resolve(result)
                    }
                }
            )
                
        })
    }
    )}

module.exports = getImageEasydocs


//http://batchimageintegration.easydocs.com.br/Service/wsimagens.asmx?WSDL