const { Schema, model, Types } = require("mongoose");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: "A Username is required",
      trim: true,
    },
    email: {
      type: String,
      required: "Email address is required",
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: {
      //array of _id values referencing THOUGHT model
      type: Schema.Types.ObjectId,
      ref: "Thought"
    },
    friends:[ {
      //array of _id values referencing USER model
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length + 1
});

const User = model("User", UserSchema);

module.exports = User;
