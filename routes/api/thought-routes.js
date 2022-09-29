const router = require('express').Router();
const {getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, deleteReaction} = require('../../controllers/thought-controller');

// set up GET all and POST thought
router.route('/').get(getAllThoughts).post(createThought);

// set up GET one, PUT, and DELETE routes at /api/thoughts/:id
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

// /api/thoughts/<thoughtId>/reactions to add a reaction to a thought
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/<thoughtId>/reactions to remove reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;