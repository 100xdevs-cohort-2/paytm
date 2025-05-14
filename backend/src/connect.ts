import mongoose  from "mongoose";
import env from "./Ienv";

const connectToMongoDB=async():Promise<string>=>{
    const mongoDBUrl =env.MONGODB_URL;

    if(!mongoDBUrl){
        return Promise.reject("MongoDB URl isnot defined properly in environment variables")
    }
    try{
        await mongoose.connect(mongoDBUrl as string);
        return "Mongoose connected"
    }catch (error) {
    if (error instanceof Error) {
      return Promise.reject(error.message);
    }
    return Promise.reject("An unknown error occurred while connecting to MongoDB");
  }

}
export default connectToMongoDB