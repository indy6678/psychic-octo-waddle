const { Schema, model } = require('mongoose')

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
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false // "id" is a virtual that mongoose returns, which is not needed
    }
);

// virtual to return the length of the friends array
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// create the User model using the UserSchema
const User = model('User', UserSchema);

module.exports = User;