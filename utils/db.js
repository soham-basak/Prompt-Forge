import mongoose from "mongoose";
let isConnected = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDb is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "prompt_forge",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongDB connected");
  } catch (error) {
    console.log(error);
  }
};
