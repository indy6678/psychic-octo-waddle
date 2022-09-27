const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');
const reactionRoutes = require('./reaction-routes');

// /api/users
router.use('/users', userRoutes);

// /api/thoughts
router.use('/thoughts', thoughtRoutes);

// /api/thoughts
router.use('/thoughts', reactionRoutes);

module.exports = router;