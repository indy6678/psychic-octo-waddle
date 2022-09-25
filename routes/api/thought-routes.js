const router = require('express').Router();
const {getAllThoughts, getThoughtById, createThought, updateThought, deleteThought} = require('../../controllers/thought-controller');



module.exports = router;