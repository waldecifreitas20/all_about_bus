const db = require('../db')

const userSchema = db.Schema({
    username : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true,
        unique : true
    },
    admin : {
        type : Boolean,
        require : false,
    },
    logged : {
        type : Boolean,
        require : false
    }
})

const UserModel = db.model('User', userSchema)

module.exports = UserModel