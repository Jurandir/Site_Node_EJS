const getCredencialAD       = require('../services/getCredencialAD')

const setCredencialAD = (req, res, next ) => {
   
    const utl_login                      = req.session.url_login || '/admin'
    let { cliente, pwd, usuario, senha } = req.body

    req.session.credencial = {}

    if (!usuario) {
        req.session.auth = false
        req.flash('msg_warning', 'Campo "Usuário local" obrigatorio para autenticação !!!!')
        res.redirect( utl_login )    
    }

    req.body.cnpj = cliente || '00000000000000'
    req.body.pwd  =  Buffer.from(`"${senha}"`).toString("base64") 
    pwd = req.body.pwd

    getCredencialAD(cliente,usuario,pwd).then((credencial)=>{

        req.session.credencial = credencial
        let Err = credencial.Err || false


        if (Err) {

            req.session.auth = false
            req.flash('msg_warning', 'Credenciais fornecidas não são válidas !!!')
            res.redirect( utl_login )        

        } else {

           res.cookie('chave',credencial, { maxAge: 900000, httpOnly: true })
           next()

        }

    }).catch((err)=>{
        console.log('ERRO: (setCredencialAD)',err)
        res.cookie('chave','Erro: '+err, { maxAge: 900000, httpOnly: true })
        next()
    })  
}
   
module.exports = setCredencialAD
