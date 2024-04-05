const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/social-network-api');

module.exports = mongoose.connection; 