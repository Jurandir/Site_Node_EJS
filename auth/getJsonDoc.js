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
        return { dados : ret.data, isErr: false}
    } catch (err) { 
        console.log(`Erro: ${err} - Params: ${cnpj},${numero},${serie} - Rotina : getJsonDoc`)
        return {err, isErr: true, url: url };
    }
}


module.exports = getJsonDoc
