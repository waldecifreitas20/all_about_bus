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

    const errors = {}

    if (userData.email.length < 2) {
        errors['email'] = 'Informe um email válido'
    }
    if (userData.username.length < 2) {
        errors['username'] = 'Informe um nome válido'
    }
    if (userData.password.length < 1) {
        errors['password'] = 'A senha deve conter no minimo 1 caracteres'
    }
    
    if (errors.length > 0) {
            req.flash('error_msg', errors)            
        res.redirect('/register')
    } else {
        const isExist = await auth.checkEmailExistence(userData.email)

        if (!isExist) {
            new UserModel(userData).save().then((user) => {
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
    }
})

module.exports = router