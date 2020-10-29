const express      = require('express')
const bodyParser   = require("body-parser")
const cookieParser = require('cookie-parser')
const session      = require('express-session')
const morgan       = require('morgan')
var flash          = require('connect-flash')

const app   = express()
const rotas = require('./routes/rotas')  

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.use(morgan('dev'))
app.use(cookieParser())
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded( { extended: true } ))
app.use(bodyParser.json())
app.use('/public', express.static(__dirname + '/public'))

app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 600000 }
}))

app.use(flash())

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid')        
    }
    res.locals.msg_success   = req.flash("msg_success")
    res.locals.msg_danger    = req.flash("msg_danger")
    res.locals.msg_info      = req.flash("msg_info")
    res.locals.msg_warning   = req.flash("msg_warning")
    res.locals.empresa       = ''
    res.locals.login         = ''
    res.locals.login         = ''

    next()
})

// Rotas
app.use('/', rotas ) 

// Serviço
const port = process.env.PORT || '5001'
const modo = process.env.NODE_ENV || 'Developer'

app.listen(port, function () {
    console.log(`Servidor WWWW - rodando na porta ${port} : Modo ${modo}`)
})
