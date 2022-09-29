const router = require('express').Router();
const {getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router.route('/').get(getAllUsers).post(createUser);

// Set up GET one, PUT, DELETE
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

router.route('/:userId/friends').post(addFriend);

router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router