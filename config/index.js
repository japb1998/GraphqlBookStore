const mongoose = require('mongoose');

async function connect() {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bookStore');
  }

module.exports = connect;
