const router = require('express').Router();
const {addReaction, deleteReaction} = require('../../controllers/reaction-controller');

// /api/thoughts/<thoughtId>/reactions to add a reaction to a thought
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/<thoughtId>/reactions to remove reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;