const loadAPI   = require('./loadAPI')

const method   = 'GET'
const endpoint = '/api/preparaDownload'
const server   =  process.env.URL_NEW_API || 'http://192.168.0.153:4999'

const getImageAgileProcess = async (par_ctrc) => {
    let params = {
        ctrc: par_ctrc,
        retTipo: 1
    }
    return await loadAPI(method,endpoint,server,params)
}

module.exports = getImageAgileProcess
