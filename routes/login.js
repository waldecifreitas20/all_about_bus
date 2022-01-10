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
    console.log(response);
    if (!response.authorized) {
        req.flash('error_msg', 'EMAIL OU SENHA INCORRETOS!')
        res.redirect('/login')
    } else {
        response.user.logged = true
        res.redirect('/users/'+response.user._id)
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
        })
        res.redirect('/')
    }).catch(console.error)
})


module.exports = router