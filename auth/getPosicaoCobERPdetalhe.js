const axios = require('axios')

const getPosicaoCobERPdetalhe = async (prefixo,fatura,tipo,token)  => {
  const url = process.env.URL_POSICAOCOBERPDETALHE
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const bodyParameters = {
    "prefixo": prefixo, 
    "fatura": fatura, 
    "tipo": tipo
  }
  
  try {       
        let ret = await axios.post(url,  bodyParameters, config)
        if (ret.data.err) {
           return {err: ret.data.err, isErr: true, url: url, params : bodyParameters }
        } else {
           return { dados : ret.data.data, resumo : ret.data.resumo , isErr: false, err: ret.data.err }
        }
  } catch (err) { 
        return {err, isErr: true, url: url, params : bodyParameters }
  }
}

module.exports = getPosicaoCobERPdetalhe