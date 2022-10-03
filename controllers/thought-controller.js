const { Thought } = require("../models");

const thoughtController = {
  getAllThoughts() {},
  getThoughtById() {},
  
  createThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        console.log(_id);
        return User.findOneAndUpdate(
          { _id: params.UserId },
          { $push: { Thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  
  updateThought() {},
  deleteThought() {},
  createReaction() {},
  deleteReactionById() {},
};

module.exports = thoughtController;
