const axios = require('axios')

const getListaDadosCTRCsXLS = async (data_ini,data_fim,token)  => {
  const url = process.env.URL_LISTDADOSCTRCXLS 

  const config = {
    headers: { "Content-Type": 'application/json', Authorization: `Bearer ${token}` },
  }

  const params = {
        DadosOuXlsx: "X",
        dt_inicial: data_ini,
        dt_final: data_fim
    }

    config.params = params

    // console.log('-> getListaDadosCTRCsXLS:',params)

    try {       
      let ret = await axios.get(url, config)
        return { dados : ret.data, isErr: false}
    } catch (err) { 
      console.log(`Erro: ${err} - Params: ${data_ini},${data_fim} - Rotina : getListaDadosCRTCsXLS`)
      return {err, isErr: true, url: url };
    }
}

module.exports = getListaDadosCTRCsXLS