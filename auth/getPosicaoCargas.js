const axios = require('axios')
const dateFormat = require('dateformat') // Uso : dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT")

const getPosicaoCargas = async (data_ini,data_fim,token)  => {
  const url = process.env.URL_POSICAOCARGA 
  const config = {
    headers: { Authorization: `Bearer ${token}` }
    }
  const dt_sql_ini = data_ini
  const dt_sql_fim = data_fim

  const bodyParameters = {
    valoresParametros: [ dt_sql_ini, dt_sql_fim]
    }
    try {       
      let ret = await axios.post(url,  bodyParameters, config)
        return { dados : ret.data, isErr: false}
    } catch (err) { 
      console.log(`Erro: ${err} - Params: ${data_ini},${data_fim} - Rotina : getPosicaoCargas`)
      return {err, isErr: true, url: url };
    }
}

module.exports = getPosicaoCargas