const axios = require('axios')

const getCliente = async ( cnpj, token )  => {
  const url = process.env.URL_DADOSCLIENTE 
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const bodyParameters = {
      cnpj: cnpj,
  }
  try {       
      let ret   = await axios.post(url,  bodyParameters, config)
      let isErr = (typeof(ret.erro)=='string') || false
        return { dados : ret.data, isErr: isErr }
    } catch (err) { 
        console.log(`Erro: ${err} - Params: ${cnpj} - Rotina : getCliente`)
        return {err, isErr: true, url: url };
    }
}

module.exports = getCliente