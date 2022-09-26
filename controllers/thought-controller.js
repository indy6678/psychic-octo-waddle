const { Thought } = require('../models');

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

    // create a new Thought
    createThought({body}, res) {
        Thought.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
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
    }
}

module.exports = thoughtController;