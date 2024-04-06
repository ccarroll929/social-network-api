const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
getAllThoughts(req, res) {
    Thought.find()
    .populate({ path: 'reactions', select: '-__v' })
    .then((Thoughts) => res.json(Thoughts))
    .catch((err) => res.status(500).json(err));
},
  // Get a single thought by its id
getThoughtById(req, res) {
    console.log(req.params);
    Thought.findOne({ _id: req.params.id })
    .populate({ path: 'reactions', select: '-__v' })
    .select('-__v')
    .then((Thought) =>
        !Thought
        ? res.status(404).json({ message: 'No Thought with that ID' })
        : res.json(Thought)
    )
    .catch((err) => res.status(500).json(err));
},
  // Create a Thought
createThought(req, res) {
    Thought.create(req.body)
    .then((dbThoughtData) => {
        return User.findOneAndUpdate(
            {_id:req.body.userID},
            {$push:{ thoughts:dbThoughtData._id}},
            {new:true}

        )
    
    })
    .then(userData => res.json(userData))
    .catch((err) => res.status(500).json(err));
},

  // Delete a Thought
deleteThought(req, res) {
    Thought.findOneAndDelete({_id: req.params.id})
    .then((thought) => {
        if(!thought){
            res.status(404).json({message: 'No thought with that ID'}) 


        }      
        
        return User.findOneAndUpdate(
            {_id:req.body.userID},
            {$pull:{thoughts:thought._id}},
            {new:true}

        )
}).then(() => res.json({message: 'User and associated apps deleted!'})).catch((err) => res.status(500).json(err));
},
  // Update a Thought
updateThought(req, res) {
    Thought.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { runValidators: true, new: true }
    )
    .then((Thought) =>
        !Thought
        ? res.status(404).json({ message: 'No Thought with this id!' })
        : res.json(Thought)
    )
    .catch((err) => res.status(500).json(err));
},
  // Add an Reaction to a Thought
addReaction(req, res) {
    console.log('You are adding an Reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
    )
    .then((thought) =>
        !thought
        ? res
            .status(404)
            .json({ message: 'No thought found with that ID :(' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},
  // Delete a reaction from a Thought 
deleteReaction(req, res) {
    console.log(req.params)

    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId} } },
        { runValidators: true, new: true }
        // { new: true }
    )
        .then((thought) =>
        // console.log("get the deleteReaction")
        !thought
            ? res
                .status(404)
                .json({ message: 'No thought found with that ID :(' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    
}