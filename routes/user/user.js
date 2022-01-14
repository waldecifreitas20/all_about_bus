const express = require('express')
const router = express.Router()
const UserModel = require('../../database/models/User')
const PostModel = require('../../database/models/Post')

const postRouter = require('./post')

router.use('/post', postRouter)

router.get('/:id', async (req, res) => {
    const id = req.params.id
    await UserModel.findOne({_id: id}).then(async user => {
        if (user.logged) {
            const dataUser = {
                _id : user._id,
                name : user.username,
                email : user.email,
                logged : user.logged
            }

            await PostModel.find().then(posts => {
                const postsData = []
                for (let i = 0; i < posts.length; i++) {
                    postsData.push({
                        _id : posts[i]._id,
                        title : posts[i].title,
                        bodyText : posts[i].bodyText
                    })   
                }       
                res.render('user/posts', {user : dataUser, posts : postsData})
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



router.get('/:spam', (req, res) => {
    res.sendFile(__dirname + '/views/notfound.html')
    })

module.exports = router