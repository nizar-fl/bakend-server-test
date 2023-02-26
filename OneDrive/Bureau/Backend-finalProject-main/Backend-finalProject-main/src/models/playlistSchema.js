const mongoose = require("mongoose")


const playlistSchema = mongoose.Schema({

    playlistName: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    userID: {
        type: String,
        required: true

    },
    songsIds: [
        {
            type: String,
            ref: 'Song'
        }
    ]

})

module.exports = mongoose.model("playlist", playlistSchema);