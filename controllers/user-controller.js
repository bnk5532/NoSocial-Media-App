const { User } = require("../models");

const userController = {
    getAllUsers(req, res){
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({_id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })
        },

    getUserById({ params }, res) {
            User.findOne({ _id: params.id })
            .populate({
              path: 'thoughts',
              select: '-__v'
            })
            .select('-__v')
            .then((dbUserData) => {
                if (!dbUserData) {
                  res.status(404).json({ message: "No User found with this ID!" });
                  return;
                }
                res.json(dbUserData);
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json(err);
              });
    },

createUser(){},
updateUser(){},
deleteUser(){},
addFriend(){},
removeFriend(){}

}

module.exports = userController