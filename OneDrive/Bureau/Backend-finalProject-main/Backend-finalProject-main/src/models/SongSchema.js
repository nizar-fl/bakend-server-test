const mongoose = require("mongoose")

const songSchema = mongoose.Schema({
    songName:{
        type:String,
        required:true,
    },
    songSource:{
        type:String,
        required:true,
    },
    artistId:{
        type:String,
        required:true
    },
    songType:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Song",songSchema)







