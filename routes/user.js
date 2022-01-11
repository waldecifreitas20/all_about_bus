const express = require('express')
const router = express.Router()
const UserModel = require('../database/models/User')
const { isLogged } = require('../database/auth/auth')


const bad_request = 'Faça login para acessar essa página'
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
            req.flash('error_msg', bad_request)
            res.redirect('/login')
        }
    }).catch(err => {
        req.flash('error_msg', 'Usuario não encontrado')
        res.redirect('/')
    })
})

router.get('/doapost/:id', async (req, res) => {
    const id = req.params.id
    if (await isLogged(id)) {
        res.render('user/doapost', {user : {logged : true, _id : id}})
    } else {
        req.flash('error_msg', bad_request)
        res.redirect('/login')
    }
})

module.exports = router