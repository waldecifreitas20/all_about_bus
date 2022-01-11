const express = require('express')
const router = express.Router()
const UserModel = require('../database/models/User')
const PostModel = require('../database/models/Post')
const { isLogged } = require('../database/auth/auth')


const bad_request = 'Faça login para acessar essa página'
router.get('/:id', async (req, res) => {
    const id = req.params.id
    await UserModel.findOne({_id: id}).then(async user => {
        if (user.logged) {
            const dataUser = {
                _id : user._id,
                name : user.userName,
                email : user.email,
                logged : user.logged
            }

            await PostModel.find().then(_posts => {
                const posts = []
                _posts.forEach(post => {
                    posts.push({ 
                        _id : post._id,
                        title : post.title,
                        body : post.body,
                        date : post.date})
                });
                res.render('user/posts', {user : dataUser, posts : posts})
            }).catch(err => {
                res.send(err)
            })
        } else {
            throw new Exception('aaaa')
        }
    }).catch(err => {
        res.redirect('/notfound')
    })
})

router.get('/doapost/:id', async (req, res) => {
    const id = req.params.id
    if (await isLogged(id)) {
        res.render('user/doapost', {user : {logged : true, _id : id}})
    } else {
        res.redirect('/notfound')
    }
})

router.post('/doapost/add/:id', async (req, res) => {
    const string = new String('ewwerewre')
    const postData = {
        title : "asda",
        bodyText : "sdse",
        date : Date.now()
    }
    let error;
    if (postData.title.length < 2) {
        error = true 
    } else if(postData.body = '' || typeof postData.body == undefined) {
        error = true     
    }
    
    if (error) {
        req.flash('error_msg', 'Preencha os campos corretamente')
        res.redirect('/users/doapost/' + req.params.id)
    } else {
         new PostModel(postData).save().then(post => {
            req.flash('success_msg', 'Post salvo com sucesso')
            res.redirect('/users/' + req.params.id)
        }).catch(err => {
            req.flash('error_msg', 'Ocorreu um erro ao salvar')
            res.redirect('/users/doapost/' + req.params.id)
        })
    }
})

module.exports = router