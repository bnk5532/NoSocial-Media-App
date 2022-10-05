const router = require('express').Router();
const { Thought, User } = require('../../models')

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReactionById
} = require("../../controllers/thought-controller");



router.route('/').get(getAllThoughts)

router.route('/:UserId').post(createThought)

router.route('/:thoughtId').get(getThoughtById).put(updateThought)

router.route('/:thoughtId/:UserId').delete(deleteThought)

router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReactionById)

module.exports = router;