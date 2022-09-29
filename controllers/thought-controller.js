const { Thought, User} = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            // .populate({
            //     path: 'thoughts friends',
            //     select: '-__v'
            // })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            })
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            // .populate({
            //     path: 'thoughts friends',
            //     select: '-__v'
            // })
            .select('-__v')
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with that id!'})
                    return;
                }
                res.json(dbThoughtData)
            })            
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            })
    },

    // create a new Thought and add to user
    createThought({body}, res) {
        Thought.create(body)
            .then(({_id}) => {
                // console.log(_id);
                return User.findOneAndUpdate(
                    {_id: body.userId},
                    {$push: {thoughts: _id}},
                    {new: true}
                );
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'No user found with that id!'});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err));
    },

    // update a Thought
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true}) 
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought was found with that ID'})
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete a Thought
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: "No thought found with this ID!"})
                return;
            }
            res.json([dbThoughtData, {message: 'The above thought was successfully deleted!'}]);
        })
        .catch(err => res.status(400).json(err));
    },

    // add a reaction to a thought
    addReaction({ params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true}
            )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({message: 'No thought found with that id!'});
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err));
    },

    // delete a reaction from a thought
    deleteReaction({ params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: { reactionId: params.reactionId}}},
            {new: true}
            )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({message: 'No thought found with that id!'});
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err));
    }

    // // add a reaction to a thought
    // addReaction({params, body}, res) {
    //     // console.log(params);
    //     Reaction.create(body)
    //     .then(({_id}) => {
    //         // console.log(_id)
    //         return Thought.findOneAndUpdate(
    //             {_id: params.thoughtId},
    //             {$push: {reactions: _id}},
    //             {new: true}
    //         );
    //     })
    //     .then(dbThoughtData => {
    //         if(!dbThoughtData) {
    //             res.status(404).json({ message: 'No thought found with that id!'});
    //             return;
    //         }
    //         res.json(dbThoughtData);
    //     })
    //     .catch(err => res.json(err));
    // },

    // // delete reaction from a thought
    // deleteReaction({params},res) {
    //     // console.log(params);
    //     Reaction.findOneAndDelete({_id: params.reactionId})
    //     .then(deletedReaction => {
    //         // console.log(deletedReaction)
    //         if(!deletedReaction) {
    //             res.status(404).json({ message: 'No reaction found with this id'});
    //             return;
    //         }
    //         return Thought.findOneAndUpdate(
    //             {_id: params.thoughtId},
    //             {$pull: {reactions: params.reactionId}}, // removes the reaction from the thought
    //             {new: true}
    //         );
    //     })
    //     .then(dbThoughtData => {
    //         if(!dbThoughtData) {
    //             res.status(404).json({message: 'No thought found with that id!'})
    //             return;
    //         }
    //         res.json(dbThoughtData);
    //     })
    //     .catch(err => res.json(err));
    // }
};

module.exports = thoughtController;