import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    const conn= await mongoose.connect(process.env.MONGO_URI)
    if(conn){
      console.log("MongoDB connected")
    }
    else{
      console.log("MongoDB not connected")
    }
  } catch (error) {
    console.log(error);
    }
};



export default connectDB;
