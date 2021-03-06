const db = require('../db')

const postSchema = db.Schema({
    title : {
        type : String,
        require : true
    },
    bodyText : {
        type : String,
        require : true
    },
    date : {
        type : Date,
        require : true
    }
})

const PostModel = db.model('Post', postSchema)

module.exports = PostModel