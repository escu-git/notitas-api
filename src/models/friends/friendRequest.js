const mongoose = require('mongoose');
const {Schema} = mongoose;

const friendRequestSchema = new Schema({
    sender:{
        type:String,
        ref:"User",
        required:true,
    },
    receiver:{
        type:String,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        default:"pending"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    connected:{
        type:Boolean,
        default:false,
    },
});

module.exports = mongoose.model('FriendRequest', friendRequestSchema)