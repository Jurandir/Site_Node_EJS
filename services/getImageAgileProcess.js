const agileBody = require('../models/listAgile')
const loadAPI   = require('./loadAPI')

const method = 'POST'
const endpoint = '/service'
const server =  process.env.AGILE_REST_URL || 'http://termaco.agileprocess.com.br/dash-beta/api/v2'

const getImageAgileProcess = async (codeAgile) => {
    let params = agileBody(codeAgile)
    return await loadAPI(method,endpoint,server,params)
}

module.exports = getImageAgileProcess
