const axios = require('axios')

const getNFsCTRC = async ( cod_ctrc, token )  => {
  const url = process.env.URL_LISTANFCTRC
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const bodyParameters = {
    cod_ctrc: cod_ctrc
  }

  try {       
      let ret   = await axios.post(url,  bodyParameters, config)
      let isErr = (typeof(ret.erro)=='string') || false
        return { dados : ret.data, isErr: isErr, rotina: "getNFsCTRC" }
    } catch (err) { 
        return {err, isErr: true, url: url, rotina: "getNFsCTRC" };
    }
}
module.exports = getNFsCTRC