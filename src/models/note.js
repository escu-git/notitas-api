const mongoose = require('mongoose');
const {Schema} = mongoose;

const noteSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    timestamp:{
        type:Date,
        default:Date.now
    },
    user:{
        type:String,
        ref:"User",
        required:true
    },
    reminder:
        {
            active:{
                type:Boolean,
                required:true,
                default:false
            },
            date: {
                type:Date,
                default : Date.now
            },
            notification_type:{
                type:String,
                required:false,
                default:""
            }
        }
    ,
    category:{
        type:Number,
        required:true
    },
    active:{
        type:Boolean,
        default:true
    },
    _id:{
        type:String,
        required:false
    }
})

module.exports = mongoose.model('Note', noteSchema );