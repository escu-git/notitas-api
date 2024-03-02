const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    displayName:{
        type:String,
        required:true,
    },
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
    language:{
        type:String,
        required:true,
        default:"Spanish"
    },
    picture:{
        type:String,
        required:false
    },
    accountType:{
        type:String,
        required:true
    },
    accountId:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("User", userSchema);