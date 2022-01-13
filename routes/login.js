const express = require('express')
const router = express.Router()
const auth = require('../database/auth/auth')
const UserModel = require('../database/models/User')

router.get('/', (req, res) => {
    res.render('login')
})

router.get('/recovery-pass', (req, res) => {
    res.send('senha recuperada com sucesso')
})

router.post('/authenticate', async (req, res) => {
    const login_data = {
        email : req.body.email,
        password : req.body.password,
    }
    const response = await auth.authenticate(login_data)

    if (!response.authorized) {
        req.flash('error_msg', 'EMAIL OU SENHA INCORRETOS!')
        res.redirect('/login')
    } else {
        response.user.logged = true
        response.user.save().then(user => {
            res.redirect('/users/'+ user._id)
        }).catch(err => {
            console.log('deu merda no login');
            res.redirect('/login')
        })
    }
})


router.get('/exit/:id', (req, res) => {
    const id = req.params.id
    UserModel.findOne({_id : id}).then(user => {
        user.logged = false
        user.save().then(() => { 
            res.redirect('/')
        }).catch(err => {
            console.log('deu merda filhão');
            res.send('ai morri')
        })
  
    }).catch(err => {
        res.send('nao achei o usuario')
    })
})


router.get('/:spam', (req, res) => {
    res.sendFile(__dirname + '/views/notfound.html')
    })

module.exports = router