import mongoose from "mongoose";

const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Data Base connected successfully");
    }catch(err){
        console.log("Database connection error")
        process.exit(1);
    }
}

export default connectDB;
