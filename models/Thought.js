const {Schema, model} = require('mongoose')
const dayjs = require('dayjs')

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dayjs(createdAtVal).format('ddd, DD MMM YYYY HH:mm (Z)')
    },
    username: {
        type: String,
        require: true
    },
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

// virtual to get total number of reactions
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

// create the thought model using ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;