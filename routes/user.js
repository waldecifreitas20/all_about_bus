const express = require('express')
const router = express.Router()
const UserModel = require('../database/models/User')

router.get('/:id', (req, res) => {
    const id = req.params.id
    UserModel.findOne({_id: id}).then(user => {
        if (user.logged) {
            const dataUser = {
                _id : user._id,
                name : user.userName,
                email : user.email,
                logged : user.logged
            }
            res.render('posts', {user : dataUser})
        } else {
            req.flash('error_msg', 'Faça login antes de entrar')
            res.redirect('/login')
        }
    }).catch(err => {
        req.flash('error_msg', 'Usuario não encontrado')
        res.redirect('/')
    })
})

module.exports = router