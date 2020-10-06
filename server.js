var express = require('express')
const bodyParser   = require("body-parser")
const cookieParser = require('cookie-parser')
const session = require('express-session')
const morgan       = require('morgan')

var app = express()

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
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/index');
    } else {
        next();
    }    
}

app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login')
})




app.get('/', (req, res) => {
    let { auth } = req.body
    if (!auth) {
        res.redirect('/login')    
    } else {
        res.redirect('/index')    
    }
})


// use res.render to load up an ejs view file

// index page 
app.get('/index', function(req, res) {
    var mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
        { name: 'Tux', organization: "Linux", birth_year: 1996},
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
    ];
    var tagline = "No programming concept is complete without a cute animal mascot.";

    res.render('pages/index', {
        mascots: mascots,
        tagline: tagline
    });
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about')
})

// Login page
app.get('/login', function(req, res) {
    res.render('pages/login')
})

app.post('/login/check', function(req, res, next ) {
    let { cnpj, pwd } = req.body
    console.log( req.body )
    if (!cnpj) {
        req.auth = false
        console.log( '1' )
        res.redirect('/login')    
    } else {
        req.auth = true
        console.log( '2' )
        res.redirect('/index')    
    }
})


app.listen(8080);
console.log('8080 is the magic port');
