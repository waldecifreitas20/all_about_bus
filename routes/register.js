const express = require('express')
const router = express.Router()
const auth = require('../database/auth/auth')
const UserModel = require('../database/models/User')

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/add', async (req, res) => {
    const userData = {
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    }    
    const isExist = await auth.checkEmailExistence(userData.email)

    if (!isExist) {
        new UserModel(userData).save().then((user) => {
            console.log(user);
            req.flash('userLogged', true)
            res.redirect(`/users/${user._id}`)
        }).catch(err => {
            req.flash('error_msg', 'Erro ao salvar no banco')
            res.redirect('/')
        })
    } else {
        req.flash('error_msg', 'EMAIL JÁ EXISTE!')
        res.redirect('/register')
    }
})

module.exports = router