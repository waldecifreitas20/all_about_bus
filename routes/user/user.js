const express = require('express')
const router = express.Router()
const postRouter = require('./post')

const UserModel = require('../../database/models/User')
const PostModel = require('../../database/models/Post')

const postServices = require('../../database/api/post_services')
const userServices = require('../../database/api/user_services')

const auth = require('../../database/auth/auth')


router.use('/post', postRouter)

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const user = await userServices.getUserById(id)
    try {    
        if (user._error || ! await auth.isLogged(id)) {
            throw new Exception()       
        }
        const allPosts = await postServices.getPosts()
        if (allPosts._error) {
            throw new Exception(allPosts._error)       
        }
        res.render('posts', {user : user, posts : allPosts})
        
    } catch (error) {
            res.redirect('/notfound')
    }

})



router.get('/:spam', (req, res) => {
    res.sendFile(__dirname + '/views/notfound.html')
    })

module.exports = router