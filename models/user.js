const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    surname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    country:{
        type:String,
        required:true,
    },
    language:{
        type:String,
        required:true,
        default:"Spanish"
    },
})

module.exports = mongoose.model("User", userSchema);