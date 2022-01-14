const express = require('express')
const router = express.Router()
const { isLogged } = require('../../database/auth/auth')
const PostModel = require('../../database/models/Post')

router.get('/', (req, res) => {
    res.send('post')
})


router.get('/:id', async (req, res) => {
    const id = req.params.id
    if (await isLogged(id)) {
        res.render('user/createpost', {user : {logged : true, _id : id}})
    } else {
        res.redirect('/notfound')
    }
})

router.post('/add/:id', async (req, res) => {

    const postData = {
        title : req.body.title,
        bodyText : req.body.bodyText,
        date : Date.now()
    }
    let error;
    if (postData.title.length < 2) {
        error = true 
    }
    if(postData.body = '' || typeof postData.body == undefined) {
        error = true     
    }
    
    if (error) {
        req.flash('error_msg', 'Preencha os campos corretamente')
        res.redirect('/users/createpost/' + req.params.id)
    } else {
        await new PostModel(postData).save().then(() => {
            req.flash('success_msg', 'Post salvo com sucesso')
            res.redirect('/users/' + req.params.id)
        }).catch(err => {
            req.flash('error_msg', 'Ocorreu um erro ao salvar')
            res.redirect('/users/createpost/' + req.params.id)
        })
    }
})

router.post('/edit', async (req, res) => {
    const post_id = req.body.post_id
    const user_id = req.body.user_id

    if (await isLogged(user_id)) {        
        await PostModel.findOne({_id : post_id}).then(post => {
            const postData = {
                _id : post._id,
                title : post.title,
                bodyText : post.bodyText
            }
            const userData = {_id : user_id, logged : true}
            res.render('user/editpost', {post : postData, user : userData})
        }).catch(err => {
            res.redirect('/notfound')
        })
    } else {
        res.redirect('/notfound')
    }

})

router.post('/save', (req, res) => {
    const user_id = req.body.user_id
    const postData = {
        _id : req.body.post_id,
        title : req.body.title,
        bodyText : req.body.bodyText
    }

    PostModel.findOne({_id : postData._id}).then(post => {
        post.title = postData.title
        post.bodyText = postData.bodyText

        post.save().then(() => {
            req.flash('success_msg', 'Post editado com sucesso!')
            res.redirect('/users/' + user_id)
        }).catch(() => {
            req.flash('error_msg', 'Ocorreu ao salvar no banco')
            res.redirect('/edit')
        })
    })
    
    res.render('user/editpost')
})

router.post('/del', async (req, res) => {
    const post_id = req.body.post_id
    const user_id = req.body.user_id

    if (await isLogged(user_id)) {
        PostModel.remove({_id : post_id}).then(() => {
            req.flash('success_msg', 'Post apagado com sucesso!')
            res.redirect('/users/' + user_id)
        }).catch(err => {
            req.flash('error_msg', 'Não foi possível apagar o post!')
            res.redirect('/users/' + user_id)
        })
    } else {
        res.redirect('/notfound')
    }
    
})


module.exports = router