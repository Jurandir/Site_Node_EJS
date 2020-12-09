const axios = require('axios')

const getCTRC = async ( empresa, serie, documento, token )  => {
  const url = process.env.URL_DADOSCTRC 
  
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  
  const bodyParameters = {
      empresa: empresa,
      serie: serie,
      documento: documento
  }
  
  try {       
      let ret   = await axios.post(url,  bodyParameters, config)
      let isErr = (typeof(ret.erro)=='string') || false
        return { dados : ret.data, isErr: isErr }
    } catch (err) { 
        return {err, isErr: true, url: url };
    }
}

module.exports = getCTRC