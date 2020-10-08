axios = require('axios')

const getJsonDoc = async (cnpj,numero,serie,token) => {
  const url = process.env.URL_JSONDOC || 'http://localhost:5000/api/apiCliente'
  const config = {
    headers: { Authorization: `Bearer ${token}` }
    }
  const bodyParameters = {
    valoresParametros: [ cnpj,numero,serie]
    }
    try {
        let ret = await axios.post(url,  bodyParameters, config)
        return { dados : ret.data, isAuthError: false}
    } catch (err) { 
        return {err, isAuthError: true, url: url };
    }
}

module.exports = getJsonDoc
