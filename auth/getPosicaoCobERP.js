const axios = require('axios')

const getPosicaoCobERP = async (cnpj,quitado,data_ini,data_fim,token)  => {
  const url = process.env.URL_POSICAOCOBERP
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  let params = {
    "cnpj": cnpj,
    "dataini": data_ini,
    "datafin": data_fim
  }

  if (quitado) {
    params.quitado = quitado
  }

  const bodyParameters = params
  
  try {       
      let ret = await axios.post(url,  bodyParameters, config)
        return { dados : ret.data, isErr: false}
  } catch (err) { 
        console.log(`Erro: ${err} - Params: ${cnpj},${data_ini},${data_fim} - Rotina : getPosicaoCobERP`)
        return {err, isErr: true, url: url, params : bodyParameters };
  }
}

module.exports = getPosicaoCobERP