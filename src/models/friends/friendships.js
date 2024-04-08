const mongoose = require('mongoose');
const {Schema} = mongoose;

const friendshipSchema = new Schema({
    user1:{
        type:String,
        ref:"User",
        required:true,
    },
    user2:{
        type:String,
        ref:"User",
        required:true,
    },
    active:{
        type:Boolean,
        default:true
    },
    requestId:{
        type: Schema.Types.ObjectId,
        ref:"FriendRequest"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
});

module.exports = mongoose.model('Friendship', friendshipSchema);