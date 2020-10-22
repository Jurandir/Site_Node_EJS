const rootCheck = (req, res) => {
    let { auth } = req.session

    req.flash('msg_success', '')
    req.flash('msg_info', '')
    req.flash('msg_warning', '')
    req.flash('msg_danger', '')

    if (!auth) {
        req.session.auth = false
        res.redirect('/login')    
    } else {
        res.redirect('/documento')    
    }
}    

module.exports = rootCheck