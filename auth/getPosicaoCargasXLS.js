const axios = require('axios')

const getPosicaoCargasXLS = async (data_ini,data_fim,token)  => {
  const url = process.env.URL_POSICAOCARGAXLS 
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const dt_sql_ini = data_ini
  const dt_sql_fim = data_fim

  const bodyParameters = {
        DadosOuXlsx: "X",
        dataini: dt_sql_ini,
        datafim: dt_sql_fim
    }
    try {       
      let ret = await axios.post(url,  bodyParameters, config)
        return { dados : ret.data, isErr: false}
    } catch (err) { 
      console.log(`Erro: ${err} - Params: ${data_ini},${data_fim} - Rotina : getPosicaoCargasXLS`)
      return {err, isErr: true, url: url };
    }
}

module.exports = getPosicaoCargasXLS