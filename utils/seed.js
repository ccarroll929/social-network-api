const connection = require('../config/connection');
const { Thought, User } = require("../models");
const userSeeds = require("./userdata.json");
const thoughtSeeds = require("./thoughtdata.json");

connection.once('open', async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});

    await User.insertMany(userSeeds);

    for (Thought of thoughtSeeds) { // loop thru all thoughts
        const user = userSeeds[Math.floor(Math.random() * userSeeds.length)]// create a random user.

        const newThought = await Thought.insertMany({
            ...Thought, // create a new thought and assign it to the random user
            userId: user.id,
            username: user.username
        })

         // update the random user
      // new thought's id is pushed to user's userThoughts array
        await User.findOneAndUpdate({ _id: user.id }, { $addToSet: { thoughts: newThought }}, {new: true })
    }
    console.log('Database seeded successfully! ');
    process.exit(0);  // once the for loop is done, stop the process 
})