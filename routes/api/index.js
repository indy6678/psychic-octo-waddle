const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// /api/users
router.use('/users', userRoutes);

// /api/thoughts
router.use('/thoughts', thoughtRoutes);

module.exports = router;