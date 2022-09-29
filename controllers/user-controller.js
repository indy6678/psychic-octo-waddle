const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            // .populate({
            //     path: 'thoughts friends',
            //     select: '-__v'
            // })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            })
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            // .populate({
            //     path: 'thoughts friends',
            //     select: '-__v'
            // })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with that id!' })
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            })
    },

    // create a new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // update a user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user was found with that ID' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with this ID!" })
                    return;
                }
                res.json([dbUserData, { message: 'The above user has been successfully deleted!' }]);
            })
            .catch(err => res.status(400).json(err));
    },

    // add friend to user
    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: body } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with that id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // delete friend from user
    removeFriend({ params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: {friendId: params.friendId}}},
            {new: true}
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with that id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err=> res.json(err));
    }
}

module.exports = userController;