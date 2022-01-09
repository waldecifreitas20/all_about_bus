const UserModel = require('../models/User')

async function checkEmailExistence(data) {
    let _response

    await UserModel.findOne({
        email : data.email,
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

module.exports = {
    authenticate : authenticate,
    checkEmailExistence : checkEmailExistence
}