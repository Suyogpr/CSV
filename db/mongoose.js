const mongoose = require('mongoose');

// MongoDB connection URI
const uri = 'mongodb+srv://suyog:suyog@cluster0.a4jhtrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

connectToDatabase();

module.exports = mongoose;
