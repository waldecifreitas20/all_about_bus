const express = require('express')
const router = express.Router()
const UserModel = require('../database/models/User')

router.get('/:id', (req, res) => {
    const id = req.params.id
    console.log(id);
    UserModel.findOne({_id: id}).then(user => {
        const dataUser = {
            _id : user._id,
            name : user.userName,
            email : user.email,
            logged : true
        }
        res.render('posts', {user : dataUser})
    }).catch(err => {
        req.flash('error_msg', 'Usuario não encontrado')
        res.redirect('/')
    })
})

module.exports = router