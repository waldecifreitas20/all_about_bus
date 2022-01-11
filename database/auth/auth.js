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

async function isLogged(idUser) {
    let _response = false
    await UserModel.findOne({_id : idUser}).then(user => {
        if (user.logged) {
            _response = true
        }
    }).catch(console.error)

    return _response
}

module.exports = {
    authenticate : authenticate,
    checkEmailExistence : checkEmailExistence,
    isLogged : isLogged
}