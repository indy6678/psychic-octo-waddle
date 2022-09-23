const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    thoughts: [],
    friends: []
});