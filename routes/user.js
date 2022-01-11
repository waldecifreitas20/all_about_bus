const express = require('express')
const router = express.Router()
const UserModel = require('../database/models/User')
const { isLogged, getUser} = require('../database/auth/auth')
router.get('/:id', (req, res) => {
    const id = req.params.id
    //refatorar
    UserModel.findOne({_id: id}).then(user => {
        if (user.logged) {
            const dataUser = {
                _id : user._id,
                name : user.userName,
                email : user.email,
                logged : user.logged
            }
            res.render('user/_postspage', {user : dataUser})
        } else {
            req.flash('error_msg', 'Faça login antes de entrar')
            res.redirect('/auth')
        }
    }).catch(err => {
        req.flash('error_msg', 'Usuario não encontrado')
        res.redirect('/')
    })
})

router.get('/post/:id', async (req, res) => {
    const id = req.params.id
    if(await isLogged(id)) {
       //Programar postmodel
    }
})

module.exports = router