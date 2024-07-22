import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;


let cache = global.mongoose;

if (!cache) {
  cache = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => {
      return mongoose;
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

export default connectDB;