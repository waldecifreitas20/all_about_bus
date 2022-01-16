const PostModel = require('../models/Post')

function _getSuccessPostResponse(model) {
    return {
        _id : model._id,
        _error : false,
        title : model.title,
        bodyText : model.bodyText
    }
}

function _getErrorResponse(err) {
    return {
        _error : true,
        message : err
    }
}

const getPosts = async () => {
    let allPosts = []
    await PostModel.find().then(all => {
        all.forEach(post => {
            allPosts.push(_getSuccessPostResponse(post)) 
        });
    }).catch(err => {
        allPosts.push(_getErrorResponse(err))
    })

    return allPosts
}

const createPost = async (postModel) => {
    let response
    await new PostModel(postModel).save().then(post =>  {
        response = _getSuccessPostResponse(post)
    }).catch(err => {
        response = _getErrorResponse(err)
    })

    return response
}

const deletePost = async (post_id) => {
    let response

    await PostModel.remove({_id : post_id}).then(() => {
        response = {_error : false}
    }).catch(err => {
        response = _getErrorResponse(err)
    })

    return response
}

const setPost = async (postData) => {
    let response
    await PostModel.findOne({_id : postData._id}).then(async post =>  {
        post.title = postData.title,
        post.bodyText = postData.bodyText
        
        await post.save().then(_post => {
            response = {_error : false}
        }).catch((err) => {
            response = _getErrorResponse(err)
        })
    }).catch(err => {
        response = _getErrorResponse(err)
    })
    return response
}

const getPostByTitle = async (title) => {
    let matchs = []
    let all = await getPosts()

    if(all._error) {
        return matchs.push(_getErrorResponse())
    } else {
        all.forEach(post => {
            const _title = post.title.toLowerCase()

            if (_title.includes(title.toLowerCase().trim())) {
                const match = _getSuccessPostResponse(post)
                matchs.push(match)
            }
        })
    }   
    
    if (matchs.length == 0) {
        matchs.push(_getErrorResponse())
    }
    return matchs
}

const getPostById = async (id) => {
    let response
    await PostModel.findOne({_id : id}).then(post => {
        response = _getSuccessPostResponse(post)
    }).catch(err => {
        response = _getErrorResponse(err)
    })

    return response
}

module.exports = {
    getPosts : getPosts,
    createPost : createPost,
    setPost : setPost,
    deletePost : deletePost,
    getPostByTitle : getPostByTitle,
    getPostById : getPostById
}




