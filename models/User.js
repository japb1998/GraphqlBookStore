const { Schema, Types, model } = require('mongoose');
const Book =  require('./Book.js');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALT);
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username required"],
        unique:true
    },
    email:{
        type:String,
        required:[true,'email was not provided'],
        unique:true
    },
    password: {
        type: String,
        required: [true, "password required"]
    },
    savedBooks: [Book]
})
//MONGO HOOKS FOR AUTHENTICATION 
// Save Hook is not implemented in update operations so you need to use save() if you are planing to change
//the password
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    const hashedPassword = await bcrypt.hash(this.password,saltRounds)
    this.password = hashedPassword;
    next();
})

UserSchema.methods.comparePassword = async function comparePassword(password){
    try{
        return await bcrypt.compare(password, this.password)
    }
    catch(error){
        throw error 
    }
}


const User = model('User', UserSchema)

module.exports = User