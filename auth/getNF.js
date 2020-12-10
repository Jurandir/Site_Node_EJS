const axios = require('axios')

const getNF = async ( cnpj, num_nf, token )  => {
  const url = process.env.URL_DADOSNF
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const bodyParameters = {
    cnpj: cnpj,
    numero: num_nf,
  }
  try {       
      let ret   = await axios.post(url,  bodyParameters, config)
      let isErr = (typeof(ret.erro)=='string') || false
        return { dados : ret.data, isErr: isErr }
    } catch (err) { 
        return {err, isErr: true, url: url };
    }
}
module.exports = getNF