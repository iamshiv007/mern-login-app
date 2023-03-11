import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server';

async function connect(){
    try {
        mongoose.set("strictQuery", true);
    
        await mongoose.connect('mongodb://127.0.0.1:27017/login-app');
        console.log("Connected on database");
      } catch (err) {
        console.log(err);
      }
}

export default connect;