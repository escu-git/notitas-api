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
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    reminder:[
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
            mode:{
                type:String,
                required:true,
                default:"email"
            }
        }
    ],
    category:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Note', noteSchema );