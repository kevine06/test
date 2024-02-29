const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        
    },
    message : {
        type: String,
        trim: true,
        maxlength: 240,
    },
    picture: {
        type: String,
    },
    video: {
        type: String,
    },
    likers: {
        type: [String],
        required: true,
    },
    Comments: {
        type: [
            {
                commenterId: String,
                commentPseudo: String,
                text: String,
                timestamp: Number,
            }
        ],
        required: true,
    },
    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model("post", PostSchema);