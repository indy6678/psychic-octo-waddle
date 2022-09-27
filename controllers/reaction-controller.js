const {Thought, Reaction} = require('../models');

const reactionController = {
    // add a reaction to a thought
    addReaction({params, body}, res) {
        // console.log(params);
        Reaction.create(body)
        .then(({_id}) => {
            // console.log(_id)
            return Thought.findOneAndUpdate(
                {_id: params.thoughtId},
                {$push: {reactions: _id}},
                {new: true}
            );
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with that id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // delete reaction from a thought
    deleteReaction({params},res) {
        // console.log(params);
        Reaction.findOneAndDelete({_id: params.reactionId})
        .then(deletedReaction => {
            // console.log(deletedReaction)
            if(!deletedReaction) {
                res.status(404).json({ message: 'No reaction found with this id'});
                return;
            }
            return Thought.findOneAndUpdate(
                {_id: params.thoughtId},
                {$pull: {reactions: params.reactionId}}, // removes the reaction from the thought
                {new: true}
            );
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with that id!'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = reactionController;