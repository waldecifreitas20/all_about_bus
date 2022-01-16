const express = require('express')
const app = express()
const path = require('path')

const { engine } = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const bodyParser = require('body-parser')

const loginRouter = require('./routes/login')
const userRouter = require('./routes/user/user')

const registerRouter = require('./routes/register')

const PostModel = require('./database/models/Post')
const { features } = require('process')

const postServices = require('./database/api/post_services')

//Settings
    //Body-parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    //Session
    app.use(session({
        secret : 'segredo',
        saveUninitialized : true,
        resave : true,
    }))
    //Flash
    app.use(flash())
    //Middlewares - Global variables
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        res.locals.site_title = req.flash('site_title')
        next()
    })
    //Handlebars
    app.engine('handlebars', engine())
    app.set('view engine', 'handlebars')
    app.set('views', './views')
    //Static Files
    app.use(express.static(path.join(__dirname,'public')))

//Routes
    //Main
    app.get('/', async (req, res) => {
        const posts = await postServices.getPosts()
            res.render('posts', {posts : posts , user : {logged : false}})
    })

    app.get('/posts', (req, res) => {
        req.flash('success_msg', 'Página atualizada com sucesso')
        res.redirect('/')
    })
    
    app.get('/search', async (req, res) => {
        const title = req.query.title
        
        const matchs = await postServices.getPostByTitle(title)
        console.log('ta na rota main');
        if (matchs[0]._error) {
            res.render('results', {search : title, posts : false})
        }

        res.render('results', {search: title, posts : matchs})
    })
        
    //Register
    app.use('/register', registerRouter)
    //Login
    app.use('/login', loginRouter)
    //User
    app.use('/users', userRouter)

    //Not Found
    app.get('/:spam', (req, res) => {
    res.sendFile(__dirname + '/views/notfound.html')
    })

//Init server
app.listen(8080, () => {
    console.log("SERVER IT'S ONLINE");
})

