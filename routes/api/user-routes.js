const router = require('express').Router();
const {getAllUsers, getUserById, createUser, updateUser, deleteUser} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router.route('/').get(getAllUsers)
router.route('/').post(createUser)

// Set up GET one, PUT, DELETE
router.route('/:id').get(getUserById);
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);

module.exports = router