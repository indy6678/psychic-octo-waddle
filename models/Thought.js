const {Schema, model, Types} = require('mongoose')
const dayjs = require('dayjs')

// added reactionschema
const ReactionSchema =  new Schema({
    reactionId: {
        type: Schema.Types.ObjectId, // Mongoose's ObjectId data type
        default: () => new Types.ObjectId() // requires Types, setting default value to new
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
    // nested subdocument
    reactions: [ReactionSchema]
    
    // // referenced subdocument
    // reactions: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Reaction'
    //     }
    // ]
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