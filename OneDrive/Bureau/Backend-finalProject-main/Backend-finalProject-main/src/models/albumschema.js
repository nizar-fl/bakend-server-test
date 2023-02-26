const mongoose = require("mongoose")



const albumSchema = mongoose.Schema({

    albumName: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    artistId: {
        type: String,
        required: true

    },
    songsIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song'
        }
    ]

})

module.exports = mongoose.model("Album", albumSchema);