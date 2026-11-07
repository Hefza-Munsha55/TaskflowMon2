const mongoose = require('mongoose');

// Connects to MongoDB Atlas (cloud). The connection string comes from MONGO_URI in .env
const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri || uri.includes('<db_password>')) {
    throw new Error('MONGO_URI is missing or still has placeholders. Edit backend/.env with your Atlas connection string.');
  }
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  console.log('MongoDB Atlas connected:', mongoose.connection.name);
};

module.exports = connectDB;
