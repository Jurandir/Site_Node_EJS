const rootCheck = (req, res) => {
    let { auth, url_login, url_base } = req.session

    req.flash('msg_success', '')
    req.flash('msg_info', '')
    req.flash('msg_warning', '')
    req.flash('msg_danger', '')

    if ( (!url_login) || (!url_base) ) {
        url_login = '/login' 
        url_base  = '/home'
    }

    if (!auth) {
        req.session.auth = false
        res.redirect( url_login )    
    } else {
        res.redirect( url_base )    
    }
}    

module.exports = rootCheck