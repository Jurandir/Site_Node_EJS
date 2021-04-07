const updSenhaCliente = require('../auth/updSenhaCliente')

const mudaSenhaCheck = async (req, res) => {
   
    //console.log('SESSION:',req.session)
    //console.log('BODY:',req.body)

    let acesso_admin = req.session.cliente ? true : false

    let cnpj         = req.session.cnpj
    let cnpj_cli     = acesso_admin ? req.session.cliente.dados.CNPJ      : req.session.cnpj
    let token        = acesso_admin ? req.session.credencial.dados.token  : req.cookies.token
    let grupos       = acesso_admin ? req.session.credencial.dados.grupos : ['SICONLINE']
    let _senha       = `${req.body.senha}`
    let _confirmacao = req.body.confirmacao
    let senha        = Number.parseInt(_senha)
    let confirmacao  = Number.parseInt(_confirmacao)
    let ok           = !(senha === 0 || confirmacao === 0 || _senha.length > 8)  

    // console.log('VALORES:',_senha,senha,_confirmacao,confirmacao,ok,cnpj_cli,grupos)

    if(!cnpj){
        ok = false
    }

    if( ok && (senha === confirmacao) && (senha == _senha) && (confirmacao == _confirmacao) ){
        try {
            await updSenhaCliente(cnpj,senha,token,grupos).then((ret)=>{
                let success = ret.dados.success
                let message = ret.dados.message || 'Mudança indisponivel !!!'
                if(success) {
                    req.flash('msg_success', message)    
                } else {
                    req.flash('msg_warning', message)
                }
            })
        } catch (err) {
            console.log('( mudaSenhaCheck ) ERRO:',err.message)
            req.flash('msg_warning', 'Operação não realizada, tente novamente depois !!!!')
        }
    } else {
        req.flash('msg_warning', 'Os valores digitados não são iguais ou são inválidos !!!!')
    }

    res.redirect('/mudasenha')
}

module.exports = mudaSenhaCheck