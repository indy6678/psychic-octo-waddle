const {Schema, model} = require('mongoose')

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        require: true
    },
    reactions: {
        

    }
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