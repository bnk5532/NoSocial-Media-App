const router = require('express').Router();
const { Thought, User } = require('../../models')

const thoughtController = {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReactionById
} = require("../../controllers/thought-controller");


router.route('/').get(getAllThoughts).post(createThought)

router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought)

router.route('/thoughts/:thoughtId/reactions').post(createReaction).delete(deleteReactionById)

module.exports = router;