import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dataBaseConnection = async () => {
    try{
          const connect = await mongoose.connect(process.env.mongodbSting!)
          console.log("database connected")
    }catch(error){
        console.log(error)
    }
}

export default dataBaseConnection;