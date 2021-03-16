
const loadAPI =  require('./services/loadAPI')

const url_API = 'http://localhost:5000/api/apiCliente'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbnBqIjoiMTY4NTE3MzIwMDAyMDYiLCJpYXQiOjE2MTUyMTIwMTMsImV4cCI6MTYxNTI5ODQxM30.PwXuWA5N41FEy-Te7jZXK4_wwQJ85cFF_BcUuLd3HlQ"
const chaveNFe = '35210316851732000206550020000604311486353790'

loadAPI('GET','',url_API,{ chaveNFe },token).then((ret)=>{
    console.log(ret)
})


