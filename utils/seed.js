const connection = require('../config/connection');
const { User, Thought } = require('../models');

const users = [
    {
        username: 'Adam',
        email: 'adam@gmail.com',
    },
    {
        username: 'Brenda',
        email: 'brenda@gmail.com'
    },
    {
        username: 'Carol',
        email: 'carol@gmail.com'
    },
    {
        username: 'Dennis',
        email: 'dennis@gmail.com'
    },
    {
        username: 'Eric',
        email: 'eric@gmail.com'
    },
    {
        username: 'Frank',
        email: 'frank@gmail.com'
    },
    {
        username: 'Gabby',
        email: 'gabby@gmail.com'
    },
    {
        username: 'Henry',
        email: 'henry@gmail.com'
    },
    {
        username: 'Isaac',
        email: 'isaac@gmail.com'
    },
    {
        username: 'Jonas',
        email: 'jonas@gmail.com'
    },
    {
        username: 'Kevin',
        email: 'kevin@gmail.com'
    },
]

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await Thought.deleteMany({});
    await User.deleteMany({});

    await User.collection.insertMany(users);

    console.info('Seeding complete! 🌱');
    process.exit(0);
});
