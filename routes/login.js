const express = require('express')
const router = express.Router()
const auth = require('../database/auth/auth')

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
        req.flash('userLogged', true)
        res.redirect('/users/'+response.user._id)
    }
})
module.exports = router