const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB Connect 
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('✅ MongoDB Connected Successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🖥️  Host: ${mongoose.connection.host}`);
    console.log(`🔢 Port: ${mongoose.connection.port}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
