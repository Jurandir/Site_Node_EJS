const validaPeriodo = (req, res, next) => {
    const { data_ini, data_fim  } = req.body

    if (!data_ini) {
        req.flash('msg_warning', 'Data inicial invalida !!!')
        res.redirect('back')   
    } else 
    if (!data_fim) {
        req.flash('msg_warning', 'Data final invalida !!!')
        res.redirect('back')   
    } else {
        req.session.data_ini = data_ini
        req.session.data_fim = data_fim
        next()
    }
}   

module.exports = validaPeriodo