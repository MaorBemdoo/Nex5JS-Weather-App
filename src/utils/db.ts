import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cache = (global as any).mongoose;

if (!cache) {
  cache = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }


  cache.conn = await cache.promise;
  return cache.conn;

}

export default connectDB;