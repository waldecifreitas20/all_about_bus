const UserModel = require('../models/User')

async function checkEmailExistence(email) {
    let _response

    await UserModel.findOne({
        email : email,
    }).then(user => {
        if (user == null) {
            _response = false
        } else {
            _response = true        
        }           
    }).catch(console.error)
    return _response
}

async function authenticate(data) {
    let _response
    await UserModel.findOne({
        email : data.email,
        password : data.password
    }).then(user => {

        if (user != null) {
            _response = {
                user : user,
                authorized : true
            }
        } else {
            _response = {
                authorized : false
            }
        }           
    }).catch(console.error)

    return _response
}

async function isLogged(userid) {
    let response = false
    await UserModel.findOne({_id : userid}).then(user => {
        if (user.isLogged) {
            response = true
        }
    })
    return response
}

async function getUserId(id) {
    let response = false
    await UserModel.findOne({_id : userid}).then(user => {
       response = user
    })
    return response
}

module.exports = {
    authenticate : authenticate,
    checkEmailExistence : checkEmailExistence,
    isLogged : isLogged
}