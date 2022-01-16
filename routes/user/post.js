const express = require('express')
const router = express.Router()

const { isLogged } = require('../../database/auth/auth')
const PostModel = require('../../database/models/Post')

const postServices = require('../../database/api/post_services')
const userServices = require('../../database/api/user_services')

router.get('/', (req, res) => {
    res.send('post')
})



router.post('/add/:id', async (req, res) => {

    const postData = {
        title : req.body.title.toLowerCase(),
        bodyText : req.body.bodyText.toLowerCase(),
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
        const post = await postServices.getPostById(post_id)      
        const user = await userServices.getUserById(user_id)      
        
        res.render('user/editpost', {post : post, user : user})
    } else {
        res.redirect('/notfound')
    }
})

router.post('/save', async (req, res) => {

    const user_id = req.body.user_id
    const postData = {
        _id : req.body.post_id,
        title : req.body.title,
        bodyText : req.body.bodyText
    }

    const response = await postServices.setPost(postData)
    if (response._error) {
        req.flash('error_msg', 'Ocorreu ao salvar no banco')
        res.redirect('/edit')
    }

    req.flash('success_msg', 'Post editado com sucesso!')
    res.redirect('/users/' + user_id)
})

router.post('/del', async (req, res) => {
    const post_id = req.body.post_id
    const user_id = req.body.user_id
   
   
    if (await isLogged(user_id)) {
        console.log('rota de del');
        let response = await postServices.deletePost(post_id)
        if (response._error) {
            req.flash('error_msg', 'Não foi possível apagar o post!')
            res.redirect('/users/' + user_id)
        }
        req.flash('success_msg', 'Post apagado com sucesso!')
        res.redirect('/users/' + user_id)
    } else {
        res.redirect('/notfound')

    } 
    
})

router.get('/search/:user_id', async (req, res) => {

    const title = req.query.title
    const matchs = await postServices.getPostByTitle(title)

    if (matchs[0]._error) {
            res.render('results', {search : title, posts : false, user : {logged : true}})
    }
    const response = {
        search: title,
         posts : matchs, 
         user : {
            _id : req.params.user_id,
            logged : true
        }
    }
    res.render('results', response)
})

router.get('/:id/create', async (req, res) => {
    const user_id = req.params.id
    
    if (await isLogged(user_id)) {
        res.render('user/createpost', {user : {logged : true, _id : user_id}})
    } else {
       // res.redirect('/notfound')
    }
})


module.exports = router