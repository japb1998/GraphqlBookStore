const {Schema,Types,model} = require('mongoose');

const BookSchema = new Schema({
    bookId:{
        type: String,
        required:true
    },
    title: {
        type: String,
        required: [true, "This book will need a name before it is saved"]
    },
    description:{
    type:String
    },
    author: [String],
    link:{
        type:String,
        required:true
    },
    image:String
},{
    _id:false
})

module.exports = BookSchema