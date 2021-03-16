const axios         = require('axios')

const loadAPI = async (method,endpoint,server,params,token) => {
    let url = server + endpoint
    let config = {
        headers: { "Content-Type": 'application/json' }
    }

    if (token) {
        config = {
            headers: { "Content-Type": 'application/json', Authorization: `Bearer ${token}` },
        }
    }

    try {       
        if (method=='POST') {
            ret = await axios.post( url, params, config )
        } else {
            config.params = params
            ret = await axios.get( url, config )
        }   

        return { dados : ret.data, isErr: false, isAxiosError: ret.isAxiosError || false }

    } catch (err) { 
        
        if (err.message) {
            dados = {url: url, err: err.message ,Err: true, isAxiosError: false } 
        } else {
           dados = {url: url, err ,Err: true, isAxiosError: true } 
        }   
        return dados
    }
}

module.exports = loadAPI
