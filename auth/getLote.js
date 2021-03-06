const axios = require('axios')

const getLote = async ( cnpj, list_nfs, token )  => {
  const url = process.env.URL_DADOSLOTENF
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const bodyParameters = {
    cnpj: cnpj,
    list_nfs: list_nfs
  }

  try {       
      let ret   = await axios.post(url,  bodyParameters, config)
      let isErr = (typeof(ret.erro)=='string') || false
        return { dados : ret.data, isErr: isErr, rotina: "getLote" }
    } catch (err) { 
        console.log(`Erro: ${err} - Params: ${cnpj},${list_nfs} - Rotina : getLote`)
        return {err, isErr: true, url: url ,rotina: "getLote"};
    }
}
module.exports = getLote