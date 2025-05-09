import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI); // 👈 Uppercase MONGO_URI
    if (con) {
      console.log("✅ Database connected");
    } else {
      console.log("❌ Database not connected");
    }
  } catch (error) {
    console.log("❌ MongoDB connection error:", error);
  }
};

export default connectDB;


