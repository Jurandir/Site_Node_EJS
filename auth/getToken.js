axios = require('axios')

const getToken = async (user,pwd) => {
  const bodyParameters = {
    cnpj: user,
    senha: pwd
   }
   try {
        let ret = await axios.post('http://localhost:5000/api/login',  bodyParameters)
        return { dados : ret.data, isAuthError: false}
    } catch (err) { 
        return {err, isAuthError: true};
    }
}

module.exports = getToken
