const {verify} = require('jsonwebtoken')

module.exports.getUser = (token) =>{
    var decoded =  verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    return decoded
}