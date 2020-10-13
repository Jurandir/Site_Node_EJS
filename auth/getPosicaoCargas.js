axios = require('axios')

const getPosicaoCargas = async (cnpj,numero,serie,token) => {
    /*
  const url = process.env.URL_JSONDOC || 'http://localhost:5000/api/posicaoCargas'
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
        return {err, isErr: true, url: url };
    }
    */
   return { dados : { teste:"" } , isErr: false }

}

module.exports = getPosicaoCargas