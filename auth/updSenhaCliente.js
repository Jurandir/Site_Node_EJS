const axios = require('axios')

const updSenhaCliente = async ( cnpj,senha,token,grupos )  => {
  const url = process.env.URL_SENHACLIENTE 
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const bodyParameters = {
      cnpj: cnpj,
      senha: senha,
      grupos: grupos,
  }
  try {       
      let ret   = await axios.post(url,  bodyParameters, config)
      let isErr = (typeof(ret.erro)=='string') || false
        return { dados : ret.data, isErr: isErr }
    } catch (err) { 
        console.log(`Erro: ${err} - Params: ${cnpj} - Rotina : updSenhaCliente`)
        return {err, isErr: true, url: url };
    }
}

module.exports = updSenhaCliente