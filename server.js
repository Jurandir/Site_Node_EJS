const express      = require('express')
const bodyParser   = require("body-parser")
const cookieParser = require('cookie-parser')
const session      = require('express-session')
const morgan       = require('morgan')

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

console.log(__dirname + '/public')

app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid')        
    }
    next()
})

var sessionChecker = (req, res, next) => {    
    console.log('sessionChecker:',req.session.user,req.cookies.user_sid)
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/login');
    } else {
        next();
    }    
}

app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login')
})

// Rotas
app.use('/', rotas ) 

// Serviço
const port = process.env.PORT || '8080'
const modo = process.env.NODE_ENV || 'Test'

app.listen(port, function () {
    console.log(`Servidor rodando na porta ${port} : Modo ${modo}`)
})
