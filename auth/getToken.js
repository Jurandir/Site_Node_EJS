axios = require('axios')

const getToken = async (user,pwd) => {
  const url = process.env.URL_GETTOKEN || 'http://localhost:5000/api/login'
  const bodyParameters = {
    cnpj: user,
    senha: pwd
   }
   try {
        let ret = await axios.post(url,  bodyParameters)
        return { dados : ret.data, isAuthError: false}
    } catch (err) { 
        console.log(`Erro: ${err} - Params: ${user}, ******* - Rotina : getToken`)
        return {err, isAuthError: true, url: url };
    }
}

module.exports = getToken
