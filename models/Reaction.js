const {Schema, model} = require('mongoose');

const ReactionSchema =  new Schema({
    reactionId: {
        type: Schema.Types.ObjectId
    },
    reactionBody: {
        type: String,
        require: true,
        maxLength: 280
    },
    username: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dayjs(createdAtVal).format('ddd, DD MMM YYYY HH:mm (Z)')
    }
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;