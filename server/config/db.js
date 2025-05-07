import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    const con=await mongoose.connect(process.env.mongoURI);
    if(con){
      console.log("database connected")
    }
    else{
      console.log("database not connected")
    }
  } catch (error) {
    console.log(error);
    
  }
};



export default connectDB;
