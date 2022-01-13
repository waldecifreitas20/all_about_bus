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
        password : req.body.password,
        logged : true
    }    

    var errors;

    if (userData.email.length < 2 || typeof email == undefined) {
        errors = true
    }
    if (userData.username.length < 2 || typeof username == undefined) {
        errors = true
    }
    if (userData.password.length < 1 || typeof password == undefined) {
        errors = true
    }

    if (errors) {
        req.flash('error_msg', 'Preencha os campos corretamente')            
        res.redirect('/register')
    } else {
        const isExist = await auth.checkEmailExistence(userData.email)

        if (!isExist) {
            new UserModel(userData).save().then((user) => {
                res.redirect(`/users/${user._id}`)
            }).catch(err => {
                req.flash('error_msg', 'Erro ao salvar no banco')
                res.redirect('/')
            })
        } else {
            req.flash('error_msg', 'EMAIL INDISPONÍVEL!')
            res.redirect('/register')
        }
    }
})

router.get('/:spam', (req, res) => {
    res.sendFile(__dirname + '/views/notfound.html')
    })

module.exports = router