const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

//reaction must proceed the ThoughtSchema due to call of [ReactionSchema] nesting
const ReactionsSchema = new Schema (
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: "This field requires input to log your reaction!",
        maxlength: 280
    },
    userName: {
        type: String,
        required: "A Username is required",
        trim: true
    },
    createdAt: {
        type: date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal),

    }
    },
    {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
      }  
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    userName: {
      type: String,
      required: "A Username must be associated with this thought!",
      trim: true
    },
    reactions: [ReactionsSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);


ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
