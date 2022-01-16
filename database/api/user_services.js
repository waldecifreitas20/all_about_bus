const UserModel = require('../models/User')

function _getSuccessUserResponse(model) {
    return {
        _id : model._id,
        _error : false,
        username : model.username,
        logged : model.logged
    }
}

function _getErrorResponse(err) {
    return {
        _error : true,
        message : err
    }
}

const getUsers = async () => {
    let allUsers = []
    await UserModel.find().then(all => {
        all.forEach(user => {
            allUsers.push(_getSuccessUserResponse(user)) 
        });
    }).catch(err => {
        allUsers.push(_getErrorResponse(err))
    })

    return allUsers
}

const createUser = async (userModel) => {
    let response
    await new UserModel(userModel).save().then(user =>  {
        response = _getSuccessUserResponse(user)
    }).catch(err => {
        response = _getErrorResponse(err)
    })

    return response
}

const setUser = async (userModel) => {
    let response
    await new UserModel.findOne({_id : userModel._id}).then(user =>  {
        user._id = userModel._id,
        user.title = userModel.title,
        user.bodyText = userModel.bodyText
        
        user.save().then(_user => {
            response = _getSuccessUserResponse(_user)
        }).catch((err) => {
            throw new Exception(err)
        })
    }).catch(err => {
        response = _getErrorResponse(err)
    })

    return response
}

const getUserByTitle = async (title) => {
    let matchs = []
    let all = await getUsers()

    if(all._error) {
        return _getErrorResponse()
    } else {
        all.forEach(user => {
            const _title = '' + user.title

            if (_title.includes(title.trim())) {
                const match = _getSuccessUserResponse(user)
                matchs.push(match)
            }
        })
    }    
}

const getUserById = async (id) => {
    let response
    await UserModel.findOne({_id : id}).then(user => {
        response = _getSuccessUserResponse(user)
    }).catch(err => {
        response = _getErrorResponse(err)
    })

    return response
}


module.exports = {
    getUsers : getUsers,
    createUser : createUser,
    setUser : setUser,
    getUserByTitle : getUserByTitle,
    getUserById : getUserById
}
