// db.js
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const options = {
  serverSelectionTimeoutMS: 5000,
};

mongoose.connect(uri, options);

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

async function disconnectFromMongoDB() {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
  process.exit(0); // Optionally exit the process after disconnecting
}

module.exports = { disconnectFromMongoDB, mongoose, db };
