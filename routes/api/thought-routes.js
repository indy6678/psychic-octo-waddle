const router = require('express').Router();
const {getAllThoughts, getThoughtById, createThought, updateThought, deleteThought} = require('../../controllers/thought-controller');

// set up GET all and POST routes at /api/thoughts/
router.route('/').get(getAllThoughts).post(createThought);

// set up GET one, PUT, and DELETE routes at /api/thoughts/:id
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

module.exports = router;