const axios = require('axios')

const getCteXML = async (empresa,serie,numero,token)  => {
    const url = process.env.URL_CTEXML // <=====( URL QUE A API VAI CONSUMIR )
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    const bodyParameters = {
        valoresParametros: [ empresa,serie,numero]
    }
    try {       
      let ret = await axios.post(url,  bodyParameters, config)
        return { dados : ret.data, isErr: false}
    } catch (err) { 
        return {err, isErr: true, url: url };
    }
}

module.exports = getCteXML